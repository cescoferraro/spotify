package router

import (
	"net/http"
	"strconv"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/go-chi/render"
	"github.com/pressly/chi"
)

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
	err = spotify.Volume(intPercent, body, r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	render.JSON(w, r, true)
}
