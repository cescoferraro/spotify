package tools

import (
	"context"
	"encoding/json"
	"net"
	"net/http"
	"os"

	"github.com/cescoferraro/spotify/api/types"
)

// IsProd TODO: NEEDS COMMENT INFO
func IsProd() bool {
	prod := os.Getenv("KUBERNETES")
	if prod == "true" {
		return true
	}
	return false
}

func GetLocalIP() string {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return ""
	}
	for _, address := range addrs {
		// check the address type and if it is not a loopback the display it
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String()
			}
		}
	}
	return ""
}

var BodyKey = &types.ContextKey{"body"}

func RequestBodyMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		Body := types.PlayerRequest{}
		err := json.NewDecoder(r.Body).Decode(&Body)
		if err != nil {
			http.Error(w, err.Error(), 400)
			return
		}
		ctx := context.WithValue(r.Context(), BodyKey, Body)
		next.ServeHTTP(w, r.WithContext(ctx))
		return
	})
}

var ClientKey = &types.ContextKey{"client"}

func SpotifyClientMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		body := r.Context().Value(BodyKey).(types.PlayerRequest)
		oauthToken, err := ProcessToken(body.Token, r)
		if err != nil {
			http.Error(w, err.Error(), 401)
			return
		}
		client := Auth(r).NewClient(oauthToken)
		ctx := context.WithValue(r.Context(), ClientKey, client)
		next.ServeHTTP(w, r.WithContext(ctx))
		return
	})
}
