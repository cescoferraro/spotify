package spotify

import (
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// Getfollowing TODO: NEEDS COMMENT INFO
func Getfollowing(code string) (*spotify.FullArtistCursorPage, error) {
	var artists *spotify.FullArtistCursorPage
	var err error
	token, err := GETToken(code)
	if err != nil {
		return artists, errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	artists, err = client.CurrentUsersFollowedArtists()
	if err != nil {
		return artists, errors.Wrap(err, "client.CurrentUser")
	}
	return artists, nil
}
