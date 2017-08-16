package spotify

import (
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// FollowArtists TODO: NEEDS COMMENT INFO
func FollowArtists(code string, ids ...string) error {
	var err error
	token, err := ProcessToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := Auth.NewClient(token)
	var spotID []spotify.ID
	for _, artist := range ids {
		spotID = append(spotID, spotify.ID(artist))
	}
	err = client.FollowArtist(spotID...)
	if err != nil {
		return errors.Wrap(err, "Follow")
	}
	return nil
}

// UnfollowArtists TODO: NEEDS COMMENT INFO
func UnfollowArtists(code string, ids ...string) error {
	var err error
	token, err := ProcessToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := Auth.NewClient(token)
	var spotID []spotify.ID
	for _, artist := range ids {
		spotID = append(spotID, spotify.ID(artist))
	}
	err = client.UnfollowArtist(spotID...)
	if err != nil {
		return errors.Wrap(err, "Follow")
	}
	return nil
}
