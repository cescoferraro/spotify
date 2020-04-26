package ispotify

import (
	"context"
	"github.com/pkg/errors"
)

// Volume TODO: NEEDS COMMENT INFO
func Volume(percent int, ctx context.Context) error {
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return errors.Wrap(err, "client.Previous")
	}
	err = client.Volume(percent)
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
