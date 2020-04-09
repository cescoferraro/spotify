package spotify

import (
	"net/http"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// Getfollowing TODO: NEEDS COMMENT INFO
func Getfollowing(code string, r *http.Request) (*spotify.FullArtistCursorPage, error) {
	var artists *spotify.FullArtistCursorPage
	var err error
	token, err := ProcessToken(code, r)
	if err != nil {
		return artists, errors.Wrap(err, "retrieveToken")
	}
	client := Auth(r).NewClient(token)
	artists, err = client.CurrentUsersFollowedArtists()
	if err != nil {
		return artists, errors.Wrap(err, "client.CurrentUser")
	}
	return artists, nil
}
