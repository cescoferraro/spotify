package spotify

import (
	"github.com/pkg/errors"
)

// Next TODO: NEEDS COMMENT INFO
func Pause(code string) error {
	token, err := ProcessToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH().NewClient(token)
	err = client.Pause()
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
