package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
)

func playlistEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		log.Println(err.Error())
		return
	}
	user, err := spotify.GetPLaylists(body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	render.JSON(w, r, user)
}
