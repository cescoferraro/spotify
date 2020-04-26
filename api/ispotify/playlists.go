package ispotify

import (
	"context"
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
	"log"
)

// GetPLaylists TODO: NEEDS COMMENT INFO
func GetPLaylists(ctx context.Context) ([]spotify.SimplePlaylist, error) {
	var playlists = new(spotify.SimplePlaylistPage)
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return playlists.Playlists, errors.Wrap(err, "client.CurrentUser")
	}

	playlists, err = client.CurrentUsersPlaylists()
	if err != nil {
		return playlists.Playlists, errors.Wrap(err, "client.CurrentUser")
	}
	log.Println(444444444444444)
	log.Println(playlists)
	return playlists.Playlists, nil
}
