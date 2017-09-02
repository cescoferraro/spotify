package spotify

import (
	"net/http"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// Play TODO: NEEDS COMMENT INFO
func Unfollow(id string, code string, r *http.Request) error {
	token, err := ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := Auth(r).NewClient(token)
	err = client.UnfollowArtist(spotify.ID(id))
	if err != nil {
		return errors.Wrap(err, "play error")
	}
	return nil
}
