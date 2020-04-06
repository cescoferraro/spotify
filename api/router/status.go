package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/go-chi/render"
)

func statusEndPoint(w http.ResponseWriter, r *http.Request) {
	render.JSON(w, r, spotify.TokenHUB.Tokens)
}
