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
			"Accept-Encoding, X-CSRF-Token, Authorization, X-Requested-With, Access-Token, State, Refresh-Token, Code, Expiry, Token-Type"
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
		ctx := context.WithValue(r.Context(), Key("code"), r.Header.Get("Code"))
		ctx = context.WithValue(ctx, Key("refresh-token"), r.Header.Get("Refresh-Token"))
		ctx = context.WithValue(ctx, Key("access-token"), r.Header.Get("Access-Token"))
		ctx = context.WithValue(ctx, Key("expiry"), r.Header.Get("Expiry"))
		ctx = context.WithValue(ctx, Key("state"), r.Header.Get("State"))
		ctx = context.WithValue(ctx, Key("token-type"), r.Header.Get("Token-Type"))
		next.ContextHandler(ctx, w, r)
	})
}
