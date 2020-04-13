package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/go-chi/render"
)

func nowPlayingEndPoint(w http.ResponseWriter, r *http.Request) {
	get := r.Header.Get("Authorization")
	log.Println(get)
	gget := r.Header.Get("authorization")
	log.Println(gget)
	user, err := spotify.PlayerState(get, r)
	if err != nil {
		log.Println(err.Error())
	}
	render.JSON(w, r, user)
}
