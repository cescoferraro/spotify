package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
)

func statusEndPoint(w http.ResponseWriter, r *http.Request) {
	render.JSON(w, r, tools.TokenHUB.Tokens)
}
