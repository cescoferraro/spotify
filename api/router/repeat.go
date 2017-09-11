package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
)

// Repeat TODO: NEEDS COMMENT INFO
func Repeat(state string, code string, r *http.Request) error {
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := tools.Auth(r).NewClient(token)
	log.Println(" 7777")
	err = client.Repeat(state)
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
func repeatEndPoint(w http.ResponseWriter, r *http.Request) {
	state := chi.URLParam(r, "state")
	token, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(401), 401)
		return
	}
	err = Repeat(state, token, r)
	if err != nil {
		http.Error(w, http.StatusText(401), 401)
		return
	}

	log.Println(token)
	render.JSON(w, r, state)
}
