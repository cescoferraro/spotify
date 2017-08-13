package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
)

func loginEndPoint(w http.ResponseWriter, r *http.Request) {
	log.Println("LOGIN")
	url := spotify.SPOTIFYAUTH.AuthURL(spotify.State)
	http.Redirect(w, r, url, http.StatusPermanentRedirect)
}
