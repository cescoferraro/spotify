package spotify

import (
	"log"
	"net/http"

	"github.com/pkg/errors"
)

// Repeat TODO: NEEDS COMMENT INFO
func Repeat(state string, code string, r *http.Request) error {
	token, err := ProcessToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := Auth().NewClient(token)
	log.Println(" 7777")
	err = client.Repeat(state)
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}
