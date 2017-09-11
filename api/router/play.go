package router

import (
	"context"
	"net/http"

	"encoding/json"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/justinas/alice"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

// PlayerRequest TODO: NEEDS COMMENT INFO
type PlayerRequest struct {
	Token  string `json:"token"`
	Device string `json:"device"`
}
type contextKey struct {
	name string
}

var bodyKey = &contextKey{"body"}
var clientKey = &contextKey{"client"}

var playEndPoint = alice.
	New(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			Body := PlayerRequest{}
			err := json.NewDecoder(r.Body).Decode(&Body)
			if err != nil {
				http.Error(w, err.Error(), 400)
				return
			}
			ctx := context.WithValue(r.Context(), bodyKey, Body)
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		})
	}).
	Append(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			body := r.Context().Value(bodyKey).(PlayerRequest)
			oauthToken, err := tools.ProcessToken(body.Token, r)
			if err != nil {
				http.Error(w, err.Error(), 401)
				return
			}
			client := tools.Auth(r).NewClient(oauthToken)
			ctx := context.WithValue(r.Context(), clientKey, client)
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		})
	}).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		body := r.Context().Value(bodyKey).(PlayerRequest)
		client := r.Context().Value(clientKey).(spotify.Client)
		var err error
		if body.Device != "" {
			id := spotify.ID(body.Device)
			err = client.PlayOpt(&spotify.PlayOptions{DeviceID: &id})
		} else {
			err = client.Play()
		}
		if err != nil {
			http.Error(w, http.StatusText(401), 401)
			return
		}
		render.JSON(w, r, true)
	}).(http.HandlerFunc)
