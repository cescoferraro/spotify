package graphql

import (
	"sync"

	"github.com/graphql-go/graphql"
	// "github.com/onnidev/api/infra"
)

func changeStream(schema graphql.Schema, subscribers *sync.Map) {
	//db, err := infra.Cloner()
	//if err != nil {
	//	log.Fatal(err)
	//}
	//pipeline := []bson.M{}
	//collections, err := db.Session.DB("onni").CollectionNames()
	//if err != nil {
	//	log.Fatal(err)
	//}
	//go func() {
	//	for _, collectionname := range collections {
	//		go func(collectionname string) {
	//			log.Println(collectionname)
	//			c := db.Session.DB("onni").C(collectionname)
	//			changeStream, _ := c.Watch(pipeline, mgo.ChangeStreamOptions{})
	//			for {
	//				var changeDoc bson.M
	//				if changeStream.Next(&changeDoc) {
	//					log.Println(collectionname)
	//					fmt.Printf("Change: %v\n", changeDoc)
	//					log.Println(33)
	//
	//					subscribers.Range(func(key, value interface{}) bool {
	//						log.Println("another")
	//						subscriber, ok := value.(*Subscriber)
	//						if !ok {
	//							return true
	//						}
	//						if subscriber.Collection == collectionname {
	//							payload := graphql.Do(graphql.Params{
	//								Schema:        schema,
	//								RequestString: subscriber.RequestString,
	//							})
	//							log.Println(subscriber.RequestString)
	//							message, err := json.Marshal(map[string]interface{}{
	//								"type":    "data",
	//								"id":      subscriber.OperationID,
	//								"payload": payload,
	//							})
	//							if err != nil {
	//								log.Printf("failed to marshal message: %v", err)
	//								return true
	//							}
	//							err = subscriber.Conn.WriteMessage(websocket.TextMessage, message)
	//							if err != nil {
	//								if err == websocket.ErrCloseSent {
	//									subscribers.Delete(key)
	//									return true
	//								}
	//								log.Printf("failed to write to ws connection: %v", err)
	//								return true
	//							}
	//						}
	//						return true
	//					})
	//				}
	//			}
	//		}(collectionname)
	//
	//	}
	//}()
	//log.Println(9999)
}
