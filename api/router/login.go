package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/go-chi/chi"
)

func loginEndPoint(state string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		// percent := chi.URLParam(r, "percent")
		log.Println("LOGIN!!!!")
		log.Println(r.Host)
		url := spotify.Auth().AuthURL(state)
		log.Println(url)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		http.Redirect(w, r, url, http.StatusPermanentRedirect)
		w.Write([]byte("<script>console.log('Please login')</script>"))
		return
	}
}

func artistloginEndPoint(state string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		move := chi.URLParam(r, "move")
		log.Println("LOGIN")
		url := spotify.Auth().AuthURL(id + "@" + move)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		http.Redirect(w, r, url, http.StatusPermanentRedirect)
		// w.Write([]byte("<script>console.log('Please login')</script>"))
		return
	}
}
