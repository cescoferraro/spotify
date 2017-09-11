package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi/render"
)

func Next(code string, r *http.Request) error {
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := tools.Auth(r).NewClient(token)
	err = client.Next()
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
func nextEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	err = Next(body, r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	render.JSON(w, r, "next")
}
