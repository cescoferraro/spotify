package router

import (
	"context"
	"log"
	"net/http"

	"encoding/json"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/justinas/alice"
	"github.com/pressly/chi/render"
)

type PlayRequest struct {
	Token  string `json:"token"`
	Device string `json:"device"`
}

var playEndPoint = alice.New(
	func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			Request := PlayRequest{}
			err := json.NewDecoder(r.Body).Decode(&Request)
			if err != nil {
				http.Error(w, err.Error(), 401)
				return
			}
			ctx := context.WithValue(r.Context(), "token", Request.Token)
			ctx = context.WithValue(ctx, "device", Request.Device)
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		})
	}).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		// Request := r.Context().Value("request").(PlayRequest)
		tokenCTX := r.Context().Value("token").(string)
		device := r.Context().Value("device").(string)
		log.Println(device)

		token, err := spotify.ProcessToken(tokenCTX, r)
		if err != nil {
			http.Error(w, http.StatusText(401), 401)
			return
		}
		client := spotify.Auth(r).NewClient(token)
		err = client.Play()
		if err != nil {
			http.Error(w, http.StatusText(401), 401)
			return
		}
		render.JSON(w, r, true)
	}).(http.HandlerFunc)
