package ispotify

import (
	"context"
	"github.com/pkg/errors"
)

func Next(ctx context.Context) error {
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return err
	}

	err = client.Next()
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
