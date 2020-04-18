package tools

import (
	"context"
	"github.com/graphql-go/handler"
	"net/http"
)

type Key string

// Cors middleware
func Cors(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		they := "Accept, Content-Type, Content-Length, " +
			"Accept-Encoding, X-CSRF-Token, Authorization, X-Requested-With"
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", they)
		}
		if r.Method == "OPTIONS" {
			w.WriteHeader(200)
			return
		}
		h.ServeHTTP(w, r)
	})

}

func HttpHeaderMiddleware(next *handler.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		ctx := context.WithValue(r.Context(), Key("token"), token)
		next.ContextHandler(ctx, w, r)
	})
}
