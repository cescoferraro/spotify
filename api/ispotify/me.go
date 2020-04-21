package ispotify

import (
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
	"log"
)

// GetProfile TODO: NEEDS COMMENT INFO
func GetProfile(code string) (*spotify.PrivateUser, error) {
	var user *spotify.PrivateUser
	var err error
	log.Println("before retrieving code")
	token, err := ProcessToken(code)
	if err != nil {
		return user, errors.Wrap(err, "retrieveToken")
	}
	log.Println("after retrieving code")
	client := Auth().NewClient(token)
	return client.CurrentUser()
}
