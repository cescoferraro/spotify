package router

import (
	"log"
	"net/http"
	"strings"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

// PlayOpts TODO: NEEDS COMMENT INFO
func PLAYPlaylist(songs []string, code string, r *http.Request) error {
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		log.Println(err.Error())
		return errors.Wrap(err, "retrieveToken")
	}
	var URIs []spotify.URI
	log.Println(songs)
	for _, value := range strings.Split(songs[0], ",") {
		log.Println(value)
		URIs = append(URIs, spotify.URI(value))
	}

	client := tools.Auth(r).NewClient(token)
	err = client.PlayOpt(&spotify.PlayOptions{
		URIs: URIs,
	})
	if err != nil {
		log.Println(err.Error())
		return errors.Wrap(err, "next error")
	}
	return nil
}

type test_struct struct {
	Token string   `json:"token"`
	Songs []string `json:"songs"`
}

func playPlaylistEndPoint(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
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
	err = PLAYPlaylist(songs, token, r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	render.JSON(w, r, token)
}
