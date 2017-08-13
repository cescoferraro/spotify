package spotify

import (
	"log"

	"github.com/pkg/errors"
)

// Repeat TODO: NEEDS COMMENT INFO
func Repeat(state string, code string) error {
	token, err := GETToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	log.Println(" 7777")
	err = client.Repeat(state)
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
