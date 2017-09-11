package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

func meEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	var user *spotify.PrivateUser
	log.Println("before retrieving code")
	token, err := tools.ProcessToken(body, r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	log.Println("after retrieving code")
	client := tools.Auth(r).NewClient(token)
	user, err = client.CurrentUser()
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	render.JSON(w, r, user)
}
