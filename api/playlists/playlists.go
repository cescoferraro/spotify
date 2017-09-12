package playlists

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/justinas/alice"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

var playlistEndPoint = alice.
	New(tools.RequestBodyMiddleware).
	Append(tools.SpotifyClientMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		client := r.Context().Value(tools.ClientKey).(spotify.Client)
		playlists, err := client.CurrentUsersPlaylists()
		if err != nil {
			http.Error(w, http.StatusText(400), 400)
			return
		}
		render.JSON(w, r, playlists)
	}).(http.HandlerFunc)
