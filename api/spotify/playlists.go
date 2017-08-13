package spotify

import (
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// GetPLaylists TODO: NEEDS COMMENT INFO
func GetPLaylists(code string) ([]spotify.SimplePlaylist, error) {
	var playlists = new(spotify.SimplePlaylistPage)
	token, err := GETToken(code)
	if err != nil {
		return playlists.Playlists, errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	playlists, err = client.CurrentUsersPlaylists()
	if err != nil {
		return playlists.Playlists, errors.Wrap(err, "client.CurrentUser")
	}
	return playlists.Playlists, nil
}
