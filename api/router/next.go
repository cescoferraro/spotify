package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/go-chi/render"
)

func nextEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	err = spotify.Next(body, r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	render.JSON(w, r, "next")
}
