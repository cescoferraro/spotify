package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
)

func playEndPoint(w http.ResponseWriter, r *http.Request) {
	token, err := tools.GetBODY(r)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = spotify.Play(token)
	if err != nil {
		log.Println(err.Error())
		return
	}

	log.Println(token)
	render.JSON(w, r, true)
}
