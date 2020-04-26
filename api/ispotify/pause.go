package ispotify

import (
	"context"
	"github.com/pkg/errors"
)

// Next TODO: NEEDS COMMENT INFO
func Pause(ctx context.Context) error {
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return err
	}
	err = client.Pause()
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
