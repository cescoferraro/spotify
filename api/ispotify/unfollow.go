package ispotify

import (
	"context"
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// Play TODO: NEEDS COMMENT INFO
func Unfollow(id string, ctx context.Context) error {
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return errors.Wrap(err, "client.Previous")
	}
	err = client.UnfollowArtist(spotify.ID(id))
	if err != nil {
		return errors.Wrap(err, "play error")
	}
	return nil
}
