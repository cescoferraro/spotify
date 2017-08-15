package spotify

import (
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// NowPlaying TODO: NEEDS COMMENT INFO
func NowPlaying(code string) (*spotify.CurrentlyPlaying, error) {
	var CurrentlyPlaying *spotify.CurrentlyPlaying
	token, err := ProcessToken(code)
	if err != nil {
		return CurrentlyPlaying, errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH().NewClient(token)

	CurrentlyPlaying, err = client.PlayerCurrentlyPlaying()
	if err != nil {
		return CurrentlyPlaying, errors.Wrap(err, "next error")
	}
	return CurrentlyPlaying, nil
}

// PlayerState TODO: NEEDS COMMENT INFO
func PlayerState(code string) (*spotify.PlayerState, error) {
	var CurrentlyPlaying *spotify.PlayerState
	token, err := ProcessToken(code)
	if err != nil {
		return CurrentlyPlaying, errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH().NewClient(token)

	CurrentlyPlaying, err = client.PlayerState()
	if err != nil {
		return CurrentlyPlaying, errors.Wrap(err, "next error")
	}
	return CurrentlyPlaying, nil
}
