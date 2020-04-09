package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/go-chi/render"
)

type test_struct struct {
	Token string   `json:"token"`
	Songs []string `json:"songs"`
}

func playPlaylistEndPoint(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	var songs []string
	var token string
	for key, values := range r.PostForm {
		if key == "token" {
			token = values[0]
		}
		if key == "songs" {
			songs = values
		}
	}
	err := spotify.PLAYPlaylist(songs, token, r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	render.JSON(w, r, token)
}
