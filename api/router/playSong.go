package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

// PlayOpts TODO: NEEDS COMMENT INFO
func PlayOpts(id string, code string, r *http.Request) error {
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := tools.Auth(r).NewClient(token)
	err = client.PlayOpt(&spotify.PlayOptions{
		URIs: []spotify.URI{spotify.URI(id)},
	})

	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
func playSongEndPoint(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	log.Println(id)
	token, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	err = PlayOpts(id, token, r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	render.JSON(w, r, id)
}
