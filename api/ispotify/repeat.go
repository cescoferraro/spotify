package ispotify

import (
	"context"
	"github.com/pkg/errors"
	"log"
)

// Repeat TODO: NEEDS COMMENT INFO
func Repeat(state string, ctx context.Context) error {
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return errors.Wrap(err, "client.Previous")
	}

	log.Println(" 7777")
	err = client.Repeat(state)
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
