package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
)

func previousEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(401), 401)
		return
	}
	err = spotify.Previous(body, r)
	if err != nil {
		http.Error(w, http.StatusText(401), 401)
		return
	}
	render.JSON(w, r, "next")
}
