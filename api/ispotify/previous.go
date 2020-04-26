package ispotify

import (
	"context"
	"github.com/pkg/errors"
)

// Next Previous: NEEDS COMMENT INFO
func Previous(ctx context.Context) error {
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return errors.Wrap(err, "client.Previous")
	}

	err = client.Previous()
	if err != nil {
		errors.Wrap(err, "next error")
	}
	return nil
}
