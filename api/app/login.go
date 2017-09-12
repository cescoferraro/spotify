package app

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
)

func loginEndPoint(state string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		// percent := chi.URLParam(r, "percent")
		log.Println("LOGIN!!!!")
		log.Println(r.Host)
		url := tools.Auth(r).AuthURL(state)
		log.Println(url)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		http.Redirect(w, r, url, http.StatusPermanentRedirect)
		w.Write([]byte("<script>console.log('Please login')</script>"))
		return
	}
}
