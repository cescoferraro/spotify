package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
)

func logoutEndPoint(w http.ResponseWriter, r *http.Request) {
	code, err := tools.GetBODY(r)
	if err != nil {
		log.Println(err.Error())
		return
	}
	spotify.TokenHUB.Lock()
	defer spotify.TokenHUB.Unlock()
	if spotify.TokenHUB.Tokens[code] != nil {
		delete(spotify.TokenHUB.Tokens, code)
		render.JSON(w, r, true)
	}
	render.JSON(w, r, false)

}
