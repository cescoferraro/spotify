package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
)

func previousEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = spotify.Previous(body)
	if err != nil {
		log.Println(err.Error())
	}
	render.JSON(w, r, "next")
}
