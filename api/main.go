package main

import (
	"context"
	"github.com/cescoferraro/spotify/api/endpoints"
	"github.com/cescoferraro/spotify/api/schema"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/graphql-go/handler"
	"log"
	"net/http"
)

var version string

func main() {
	generatedSchema, err := schema.GenerrateSchema()
	if err != nil {
		log.Fatal(err)
	}
	r := chi.NewRouter()
	r.Use(middleware.Logger, tools.Cors)
	r.HandleFunc("/auth", endpoints.RootEndPoint)
	r.Get("/version", endpoints.VersionEndPoint(version))
	r.Handle("/graphql", tools.HttpHeaderMiddleware(
		handler.New(&handler.Config{
			Schema: &generatedSchema,
			RootObjectFn: func(ctx context.Context, r *http.Request) map[string]interface{} {
				return map[string]interface{}{"rootValue": "foo"}
			},
			Pretty:     true,
			GraphiQL:   false,
			Playground: true,
		}),
	))
	log.Printf("cescco Starting Spotify API Tester version %s ...", version)
	log.Fatal(http.ListenAndServe("0.0.0.0:8080", r))
}
