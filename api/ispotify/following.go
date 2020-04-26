package ispotify

import (
	"context"
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// Getfollowing TODO: NEEDS COMMENT INFO
func Getfollowing(ctx context.Context) (*spotify.FullArtistCursorPage, error) {
	var artists *spotify.FullArtistCursorPage
	var err error
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return artists, err
	}

	artists, err = client.CurrentUsersFollowedArtists()
	if err != nil {
		return artists, errors.Wrap(err, "client.CurrentUser")
	}
	return artists, nil
}
