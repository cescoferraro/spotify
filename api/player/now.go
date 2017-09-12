package player

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/spotify/api/types"
	"github.com/justinas/alice"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

var nowPlayingEndPoint = alice.
	New(tools.RequestBodyMiddleware).
	Append(tools.SpotifyClientMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		client := r.Context().Value(tools.ClientKey).(spotify.Client)
		response, err := client.PlayerState()
		if err != nil {
			http.Error(w, err.Error(), 400)
			return
		}
		devices, err := client.PlayerDevices()
		if err != nil {
			http.Error(w, err.Error(), 400)
			return
		}
		render.JSON(w, r, types.PlayerStateResponse{State: *response, Devices: devices})
	}).(http.HandlerFunc)
