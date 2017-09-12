package tools

import (
	"net/http"
)

// Cors TODO: NEEDS COMMENT INFO
func Cors(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		they := "Accept, Content-Type, Content-Length, " +
			"Accept-Encoding, X-CSRF-Token, Authorization, X-Requested-With"
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", they)
		}
		// Pause here if its Preflighted OPTIONS request
		if r.Method == "OPTIONS" {
			w.WriteHeader(200)
			return
		}
		h.ServeHTTP(w, r)
	})

}
