package player

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/spotify/api/types"
	"github.com/justinas/alice"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

var repeatEndPoint = alice.
	New(tools.RequestBodyMiddleware).
	Append(tools.SpotifyClientMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		state := chi.URLParam(r, "state")
		body := r.Context().Value(tools.BodyKey).(types.PlayerRequest)
		client := r.Context().Value(tools.ClientKey).(spotify.Client)
		var err error
		if body.Device != "" {
			id := spotify.ID(body.Device)
			err = client.RepeatOpt(state, &spotify.PlayOptions{DeviceID: &id})
		} else {
			err = client.Repeat(state)
		}
		if err != nil {
			http.Error(w, http.StatusText(401), 401)
			return
		}
		render.JSON(w, r, true)
	}).(http.HandlerFunc)
