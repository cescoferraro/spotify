package player

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/spotify/api/types"
	"github.com/justinas/alice"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

var playPlaylistEndPoint = alice.
	New(tools.RequestBodyMiddleware).
	Append(tools.SpotifyClientMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		body := r.Context().Value(tools.BodyKey).(types.PlayerRequest)
		client := r.Context().Value(tools.ClientKey).(spotify.Client)
		var URIs []spotify.URI
		for _, value := range body.Songs {
			URIs = append(URIs, spotify.URI(value))
		}
		opts := &spotify.PlayOptions{URIs: URIs}
		var err error
		if body.Device != "" {
			device := spotify.ID(body.Device)
			opts.DeviceID = &device
			err = client.PlayOpt(opts)
		} else {
			err = client.PlayOpt(opts)
		}
		if err != nil {
			http.Error(w, err.Error(), 400)
			return
		}
		render.JSON(w, r, true)
	}).(http.HandlerFunc)
