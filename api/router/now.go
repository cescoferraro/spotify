package router

import (
	"fmt"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
)

func nowPlayingEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	user, err := spotify.Now(body, r)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	fmt.Println(user.State)
	render.JSON(w, r, user)
}
