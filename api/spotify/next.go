package spotify

import (
	"github.com/pkg/errors"
)

func Next(code string) error {
	token, err := GETToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	err = client.Next()
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
