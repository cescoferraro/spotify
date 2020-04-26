package ispotify

import (
	"context"
	"github.com/pkg/errors"
)

// Play TODO: NEEDS COMMENT INFO
func Play(ctx context.Context) error {
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return err
	}
	err = client.Play()
	if err != nil {
		return errors.Wrap(err, "play error")
	}
	return nil
}
