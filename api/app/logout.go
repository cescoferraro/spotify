package app

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/spotify/api/types"
	"github.com/justinas/alice"
	"github.com/pressly/chi/render"
)

func slogoutEndPoint(w http.ResponseWriter, r *http.Request) {
}

var logoutEndPoint = alice.
	New(tools.RequestBodyMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		body := r.Context().Value(tools.BodyKey).(types.PlayerRequest)
		tools.TokenHUB.Lock()
		defer tools.TokenHUB.Unlock()
		if tools.TokenHUB.Tokens[body.Token] != nil {
			delete(tools.TokenHUB.Tokens, body.Token)
			render.JSON(w, r, true)
			return
		}
		render.JSON(w, r, false)

	}).(http.HandlerFunc)
