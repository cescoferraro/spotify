package router

import (
	"net/http"
	"strconv"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
)

// Volume TODO: NEEDS COMMENT INFO
func Volume(percent int, code string, r *http.Request) error {
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := tools.Auth(r).NewClient(token)
	err = client.Volume(percent)
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}

func volumeEndPoint(w http.ResponseWriter, r *http.Request) {
	percent := chi.URLParam(r, "percent")
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	intPercent, err := strconv.Atoi(percent)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	err = Volume(intPercent, body, r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	render.JSON(w, r, true)
}
