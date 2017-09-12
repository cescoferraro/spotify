package profile

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/justinas/alice"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

var meEndPoint = alice.
	New(tools.RequestBodyMiddleware).
	Append(tools.SpotifyClientMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		client := r.Context().Value(tools.ClientKey).(spotify.Client)
		user, err := client.CurrentUser()
		if err != nil {
			http.Error(w, err.Error(), 401)
			return
		}
		render.JSON(w, r, user)
	}).(http.HandlerFunc)
