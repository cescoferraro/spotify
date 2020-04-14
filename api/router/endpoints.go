package router

import (
	"context"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"log"
	"net/http"
)

// Router TODO: NEEDS COMMENT INFO
func Endpoints(version string) chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.Logger, tools.Cors)
	r.Post("/me", meEndPoint)
	r.Get("/now", nowPlayingEndPoint)
	r.Get("/login", loginEndPoint("dashboard"))
	r.Get("/version", versionEndPoint(version))
	r.HandleFunc("/auth", rootEndPoint)
	schema := funcName()
	r.Handle("/graphql", httpHeaderMiddleware(
		handler.New(&handler.Config{
			Schema: &schema,
			RootObjectFn: func(ctx context.Context, r *http.Request) map[string]interface{} {
				return map[string]interface{}{"rootValue": "foo"}
			},
			Pretty:     true,
			GraphiQL:   false,
			Playground: true,
		}),
	))
	return r
}

func funcName() graphql.Schema {
	config, err := schemaConfig()
	if err != nil {
		log.Fatal(err)
	}
	schema, err := graphql.NewSchema(config)
	if err != nil {
		log.Fatal(err)
	}
	return schema
}

type key string

func httpHeaderMiddleware(next *handler.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		ctx := context.WithValue(r.Context(), key("token"), token)
		next.ContextHandler(ctx, w, r)
	})
}
