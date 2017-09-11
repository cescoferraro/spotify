package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
)

func logoutEndPoint(w http.ResponseWriter, r *http.Request) {
	code, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	tools.TokenHUB.Lock()
	defer tools.TokenHUB.Unlock()
	if tools.TokenHUB.Tokens[code] != nil {
		delete(tools.TokenHUB.Tokens, code)
		render.JSON(w, r, true)
	}
	render.JSON(w, r, false)

}
