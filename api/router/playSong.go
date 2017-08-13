package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
)

func playSongEndPoint(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	log.Println(id)
	token, err := tools.GetBODY(r)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = spotify.PlayOpts(id, token)
	if err != nil {
		log.Println(err.Error())
		return
	}

	log.Println(token)
	render.JSON(w, r, id)
}
