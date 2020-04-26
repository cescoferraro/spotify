package ispotify

import (
	"context"
	"github.com/zmb3/spotify"
	"log"
)

// GetProfile TODO: NEEDS COMMENT INFO
func GetProfile(ctx context.Context) (*spotify.PrivateUser, error) {
	var user *spotify.PrivateUser
	var err error
	log.Println("before retrieving code")
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return user, err
	}
	return client.CurrentUser()
}
