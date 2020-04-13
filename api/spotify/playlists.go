package spotify

import (
	"log"
	"net/http"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// GetPLaylists TODO: NEEDS COMMENT INFO
func GetPLaylists(code string, r *http.Request) ([]spotify.SimplePlaylist, error) {
	var playlists = new(spotify.SimplePlaylistPage)
	token, err := ProcessToken(code)
	if err != nil {
		return playlists.Playlists, errors.Wrap(err, "retrieveToken")
	}
	client := Auth().NewClient(token)
	playlists, err = client.CurrentUsersPlaylists()
	if err != nil {
		return playlists.Playlists, errors.Wrap(err, "client.CurrentUser")
	}
	log.Println(444444444444444)
	log.Println(playlists)
	return playlists.Playlists, nil
}
