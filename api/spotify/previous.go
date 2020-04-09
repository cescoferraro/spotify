package spotify

import (
	"net/http"

	"github.com/pkg/errors"
)

// Next Previous: NEEDS COMMENT INFO
func Previous(code string, r *http.Request) error {
	token, err := ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := Auth(r).NewClient(token)
	err = client.Previous()
	if err != nil {
		errors.Wrap(err, "next error")
	}
	return nil
}
