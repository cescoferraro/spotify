package following

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/justinas/alice"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

var unfollowEndPoint = alice.
	New(tools.RequestBodyMiddleware).
	Append(tools.SpotifyClientMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		client := r.Context().Value(tools.ClientKey).(spotify.Client)
		err := client.UnfollowArtist(spotify.ID(chi.URLParam(r, "id")))
		if err != nil {
			http.Error(w, err.Error(), 400)
			return
		}
		render.JSON(w, r, true)
	}).(http.HandlerFunc)
