package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
)

func pauseEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	err = spotify.Pause(body, r)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	render.JSON(w, r, "next")
}
