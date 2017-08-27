package spotify

import (
	"log"
	"net/http"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// GetProfile TODO: NEEDS COMMENT INFO
func GetProfile(code string, r *http.Request) (*spotify.PrivateUser, error) {
	var user *spotify.PrivateUser
	var err error
	log.Println("before retrieving code")
	token, err := ProcessToken(code, r)
	if err != nil {
		return user, errors.Wrap(err, "retrieveToken")
	}
	log.Println("after retrieving code")
	client := Auth(r).NewClient(token)
	return client.CurrentUser()
}
