package spotify

import (
	"log"
	"net/http"
	"strings"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// PlayOpts TODO: NEEDS COMMENT INFO
func PlayOpts(id string, code string, r *http.Request) error {
	token, err := ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := Auth(r).NewClient(token)
	err = client.PlayOpt(&spotify.PlayOptions{
		URIs: []spotify.URI{spotify.URI(id)},
	})

	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}

// PlayOpts TODO: NEEDS COMMENT INFO
func PLAYPlaylist(songs []string, code string, r *http.Request) error {
	token, err := ProcessToken(code, r)
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

	client := Auth(r).NewClient(token)
	err = client.PlayOpt(&spotify.PlayOptions{
		URIs: URIs,
	})
	if err != nil {
		log.Println(err.Error())
		return errors.Wrap(err, "next error")
	}
	return nil
}
