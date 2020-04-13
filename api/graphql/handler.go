package graphql

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/go-chi/chi"
	"github.com/gorilla/websocket"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

// ConnectionACKMessage TODO: NEEDS COMMENT INFO
type ConnectionACKMessage struct {
	OperationID   string `json:"id,omitempty"`
	OperationName string `json:"operationName,omitempty"`
	Type          string `json:"type"`
	Payload       struct {
		Query     string            `json:"query"`
		Token     string            `json:"token"`
		Variables map[string]string `json:"variables"`
	} `json:"payload,omitempty"`
}

// Subscriber TODO: NEEDS COMMENT INFO
type Subscriber struct {
	ID            int
	Conn          *websocket.Conn
	Collection    string
	RequestString string
	OperationID   string
}

var upgrader = websocket.Upgrader{
	HandshakeTimeout: 1 * time.Second,
	ReadBufferSize:   1024,
	WriteBufferSize:  1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
	Subprotocols: []string{"graphql-ws"},
}

type key string

func httpHeaderMiddleware(next *handler.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("TOKEN")
		ctx := context.WithValue(r.Context(), key("token"), token)
		next.ContextHandler(ctx, w, r)
	})
}

// NewGraphQLL TODO: NEEDS COMMENT INFO
func NewGraphQLL(r chi.Router) {
	var subscribers sync.Map
	schema, err := graphql.NewSchema(schemaConfig)
	if err != nil {
		log.Fatal(err)
	}
	h := handler.New(&handler.Config{
		Schema: &schema,
		RootObjectFn: func(ctx context.Context, r *http.Request) map[string]interface{} {
			return map[string]interface{}{"rootValue": "foo"}
		},
		Pretty:     true,
		GraphiQL:   false,
		Playground: true,
	})
	// go changeStream(schema, &subscribers)

	r.Route("/graphql", func(n chi.Router) {
		// n.Use(middlewares.GraphQLCors)
		n.Handle("/", httpHeaderMiddleware(h))
	})
	r.HandleFunc("/subscriptions", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Printf("failed to do websocket upgrade: %v", err)
			return
		}
		connectionACK, err := json.Marshal(map[string]string{
			"type": "connection_ack",
		})
		if err != nil {
			log.Printf("failed to marshal ws connection ack: %v", err)
		}
		if err := conn.WriteMessage(websocket.TextMessage, connectionACK); err != nil {
			log.Printf("failed to write to ws connection: %v", err)
			return
		}
		token := "initial"
		go func() {
			for {
				_, p, err := conn.ReadMessage()
				if websocket.IsCloseError(err, websocket.CloseGoingAway) {
					return
				}
				if err != nil {
					log.Println(err.Error())
					log.Println("failed to read websocket message: %v", err)
					return
				}
				var msg ConnectionACKMessage
				err = json.Unmarshal(p, &msg)
				if err != nil {
					log.Printf("failed to unmarshal: %v", err)
					return
				}
				if msg.Type == "connection_init" {
					if msg.Payload.Token == "" || msg.Payload.Token == "NOTVALIDTOKEN" {
						message, err := json.Marshal(map[string]interface{}{
							"type":    "data",
							"error":   "401",
							"payload": "failed auth",
						})
						if err != nil {
							log.Printf("failed to marshal message: %v", err)
							return
						}
						conn.WriteMessage(websocket.TextMessage, message)
						conn.Close()
						return
					}
					token = msg.Payload.Token
				}
				if msg.Type == "start" {
					length := 0
					log.Println(msg.Payload.Variables)
					if msg.Payload.Variables["collection"] == "" {
						message, err := json.Marshal(map[string]interface{}{
							"type":    "data",
							"error":   "401",
							"payload": "no collection",
						})
						if err != nil {
							log.Printf("failed to marshal message: %v", err)
							return
						}
						conn.WriteMessage(websocket.TextMessage, message)
						conn.Close()
						return
					}
					subscribers.Range(func(key, value interface{}) bool {
						length++
						return true
					})
					var subscriber = Subscriber{
						ID:            length + 1,
						Conn:          conn,
						RequestString: msg.Payload.Query,
						OperationID:   msg.OperationID,
						Collection:    msg.Payload.Variables["collection"],
					}
					subscribers.Store(subscriber.ID, &subscriber)
					all := make(map[string]interface{})
					for key, s := range msg.Payload.Variables {
						all[key] = s
					}
					ctx := context.Background()
					ctx = context.WithValue(ctx, key("token"), token)
					payload := graphql.Do(graphql.Params{
						VariableValues: all,
						Schema:         schema,
						RequestString:  subscriber.RequestString,
						Context:        ctx,
					})
					message, err := json.Marshal(map[string]interface{}{
						"type":    "data",
						"id":      subscriber.OperationID,
						"payload": payload,
					})
					if err != nil {
						log.Printf("failed to marshal message: %v", err)
						return
					}
					err = subscriber.Conn.WriteMessage(websocket.TextMessage, message)
					if err != nil {
						if err == websocket.ErrCloseSent {
							subscribers.Delete(subscriber.ID)
						}
						log.Printf("failed to write to ws connection: %v", err)
						return
					}
				}
			}
		}()
	})
}
