package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi/render"
)

// Next Previous: NEEDS COMMENT INFO
func Previous(code string, r *http.Request) error {
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := tools.Auth(r).NewClient(token)
	err = client.Previous()
	if err != nil {
		errors.Wrap(err, "next error")
	}
	return nil
}
func previousEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(401), 401)
		return
	}
	err = Previous(body, r)
	if err != nil {
		http.Error(w, http.StatusText(401), 401)
		return
	}
	render.JSON(w, r, "next")
}
