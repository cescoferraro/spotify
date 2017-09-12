package following

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/justinas/alice"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

var followingEndPoint = alice.
	New(tools.RequestBodyMiddleware).
	Append(tools.SpotifyClientMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		client := r.Context().Value(tools.ClientKey).(spotify.Client)
		artists, err := client.CurrentUsersFollowedArtists()
		if err != nil {
			http.Error(w, err.Error(), 401)
			return
		}
		render.JSON(w, r, artists)
	}).(http.HandlerFunc)
