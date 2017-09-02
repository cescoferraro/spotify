package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
)

func songsEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	user, err := spotify.Songs(body, r)
	if err != nil {
		http.Error(w, err.Error(), 401)
		return
	}
	render.JSON(w, r, user)
}
