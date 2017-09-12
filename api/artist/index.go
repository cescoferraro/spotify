package artist

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi"
)

func artistloginEndPoint(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	move := chi.URLParam(r, "move")
	log.Println("LOGIN")
	url := tools.Auth(r).AuthURL(id + "@" + move)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	http.Redirect(w, r, url, http.StatusPermanentRedirect)
	return
}

func RegisterArtistEndpoints(base string, r *chi.Mux) {
	r.Route(base, func(r chi.Router) {
		r.Get("/{move}/{id}", artistloginEndPoint)
		r.Post("/{move}/{id}", anittaEndPoint)
	})
}
