package spotify

import (
	"github.com/pkg/errors"
)

// Play TODO: NEEDS COMMENT INFO
func Play(code string) error {
	token, err := ProcessToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH().NewClient(token)
	err = client.Play()
	if err != nil {
		return errors.Wrap(err, "play error")
	}
	return nil
}
