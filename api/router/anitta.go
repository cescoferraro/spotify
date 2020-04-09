package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/go-chi/render"
	"github.com/pressly/chi"
)

func anittaEndPoint(move bool) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		code, err := tools.GetBODY(r)
		if err != nil {
			http.Error(w, http.StatusText(400), 400)
			return
		}

		id := chi.URLParam(r, "id")
		profile, err := spotify.ShowFeelings(move, id, code, r)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, http.StatusText(400), 400)
			return
		}
		render.JSON(w, r, profile)
	}
}
