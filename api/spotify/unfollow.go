package spotify

import (
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// Play TODO: NEEDS COMMENT INFO
func Unfollow(id string, code string) error {
	token, err := ProcessToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH().NewClient(token)
	err = client.UnfollowArtist(spotify.ID(id))
	if err != nil {
		return errors.Wrap(err, "play error")
	}
	return nil
}
