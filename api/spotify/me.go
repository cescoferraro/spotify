package spotify

import (
	"log"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// GetProfile TODO: NEEDS COMMENT INFO
func GetProfile(code string) (*spotify.PrivateUser, error) {
	var user *spotify.PrivateUser
	var err error
	log.Println("before retrieving code")
	token, err := GETToken(code)
	if err != nil {
		return user, errors.Wrap(err, "retrieveToken")
	}
	log.Println("after retrieving code")
	client := SPOTIFYAUTH.NewClient(token)
	return client.CurrentUser()
}
