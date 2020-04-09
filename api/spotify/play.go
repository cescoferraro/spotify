package spotify

import (
	"net/http"

	"github.com/pkg/errors"
)

// Play TODO: NEEDS COMMENT INFO
func Play(code string, r *http.Request) error {
	token, err := ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := Auth(r).NewClient(token)
	err = client.Play()
	if err != nil {
		return errors.Wrap(err, "play error")
	}
	return nil
}
