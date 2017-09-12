package tools

import (
	"context"
	"encoding/json"
	"net"
	"net/http"
	"os"

	"github.com/cescoferraro/spotify/api/types"
	"github.com/go-chi/chi"
	"github.com/zmb3/spotify"
)

func Split(buf []spotify.ID, lim int) [][]spotify.ID {
	var chunk []spotify.ID
	chunks := make([][]spotify.ID, 0, len(buf)/lim+1)
	for len(buf) >= lim {
		chunk, buf = buf[:lim], buf[lim:]
		chunks = append(chunks, chunk)
	}
	if len(buf) > 0 {
		chunks = append(chunks, buf[:len(buf)])
	}
	return chunks
}

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

var MoveKey = &types.ContextKey{"move"}

func GetMoveFromRequest(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var move bool
		moveR := chi.URLParam(r, "move")
		switch moveR {
		case "love":
			move = true
		case "hate":
			move = true
		default:
			http.Error(w, "either love or hate", 400)
			return
		}
		ctx := context.WithValue(r.Context(), MoveKey, move)
		next.ServeHTTP(w, r.WithContext(ctx))
		return
	})
}
