package spotify

import (
	"net/http"

	"github.com/pkg/errors"
)

// Next TODO: NEEDS COMMENT INFO
func Pause(code string, r *http.Request) error {
	token, err := ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := Auth(r).NewClient(token)
	err = client.Pause()
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
