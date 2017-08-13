package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
)

func repeatEndPoint(w http.ResponseWriter, r *http.Request) {
	state := chi.URLParam(r, "state")
	token, err := tools.GetBODY(r)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = spotify.Repeat(state, token)
	if err != nil {
		log.Println(err.Error())
		return
	}

	log.Println(token)
	render.JSON(w, r, state)
}
