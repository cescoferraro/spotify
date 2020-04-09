package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/go-chi/render"
)

func nowPlayingEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		log.Println(err.Error())
		return
	}
	user, err := spotify.PlayerState(body, r)
	if err != nil {
		log.Println(err.Error())
	}
	render.JSON(w, r, user)
}
