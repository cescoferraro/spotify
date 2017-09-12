package player

import (
	"net/http"
	"strconv"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/spotify/api/types"
	"github.com/justinas/alice"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

var volumeEndPoint = alice.
	New(tools.RequestBodyMiddleware).
	Append(tools.SpotifyClientMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		percent := chi.URLParam(r, "percent")
		intPercent, err := strconv.Atoi(percent)
		if err != nil {
			http.Error(w, http.StatusText(400), 400)
			return
		}
		body := r.Context().Value(tools.BodyKey).(types.PlayerRequest)
		client := r.Context().Value(tools.ClientKey).(spotify.Client)
		if body.Device != "" {
			id := spotify.ID(body.Device)
			err = client.VolumeOpt(intPercent, &spotify.PlayOptions{DeviceID: &id})
		} else {
			err = client.Volume(intPercent)
		}
		if err != nil {
			http.Error(w, http.StatusText(401), 401)
			return
		}
		render.JSON(w, r, true)
	}).(http.HandlerFunc)
