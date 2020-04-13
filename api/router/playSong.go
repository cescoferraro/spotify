package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

func playSongEndPoint(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	log.Println(id)
	token, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	err = spotify.PlayOpts(id, token, r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	render.JSON(w, r, id)
}
