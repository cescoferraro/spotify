package spotify

import (
	"net/http"

	"github.com/pkg/errors"
)

// Volume TODO: NEEDS COMMENT INFO
func Volume(percent int, code string, r *http.Request) error {
	token, err := ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := Auth(r).NewClient(token)
	err = client.Volume(percent)
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}