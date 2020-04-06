package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/go-chi/render"
)

func playEndPoint(w http.ResponseWriter, r *http.Request) {
	token, err := tools.GetBODY(r)
	log.Println("hey")
	if err != nil {
		http.Error(w, http.StatusText(401), 401)
		return
	}
	err = spotify.Play(token, r)
	if err != nil {
		http.Error(w, http.StatusText(401), 401)
		return
	}
	render.JSON(w, r, true)
}
