package ispotify

import (
	"context"
	"log"
	"strings"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// PlayOpts TODO: NEEDS COMMENT INFO
func PlayOpts(id string, ctx context.Context) error {
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return err
	}
	err = client.PlayOpt(&spotify.PlayOptions{
		URIs: []spotify.URI{spotify.URI(id)},
	})

	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}

// PlayOpts TODO: NEEDS COMMENT INFO
func PLAYPlaylist(songs []string, ctx context.Context) error {
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return err
	}
	var URIs []spotify.URI
	log.Println(songs)
	for _, value := range strings.Split(songs[0], ",") {
		log.Println(value)
		URIs = append(URIs, spotify.URI(value))
	}
	err = client.PlayOpt(&spotify.PlayOptions{
		URIs: URIs,
	})
	if err != nil {
		log.Println(err.Error())
		return errors.Wrap(err, "next error")
	}
	return nil
}
