package ispotify

import (
	"context"
	"github.com/cescoferraro/structql"
	"strings"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// NowPlaying TODO: NEEDS COMMENT INFO
func NowPlaying(ctx context.Context) (*spotify.CurrentlyPlaying, error) {
	var CurrentlyPlaying *spotify.CurrentlyPlaying
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return CurrentlyPlaying, err
	}
	CurrentlyPlaying, err = client.PlayerCurrentlyPlaying()
	if err != nil {
		return CurrentlyPlaying, errors.Wrap(err, "next error")
	}
	return CurrentlyPlaying, nil
}

var PlayerStateGraphQLType = structql.GenerateType(spotify.PlayerState{
	CurrentlyPlaying: spotify.CurrentlyPlaying{
		Item: &spotify.FullTrack{
			SimpleTrack: spotify.SimpleTrack{
				Artists: []spotify.SimpleArtist{{}},
			},
			Album: spotify.SimpleAlbum{
				AvailableMarkets: []string{""},
				Images:           []spotify.Image{{}},
			},
		},
	},
})

// PlayerState TODO: NEEDS COMMENT INFO
func PlayerState(code string) (*spotify.PlayerState, error) {
	var CurrentlyPlaying *spotify.PlayerState
	token, err := Auth().Exchange(code)
	if err != nil {
		return CurrentlyPlaying, errors.Wrap(err, "retrieveToken")
	}
	client := Auth().NewClient(token)
	CurrentlyPlaying, err = client.PlayerState()
	if err != nil {
		return CurrentlyPlaying, errors.Wrap(err, "next error")
	}
	return CurrentlyPlaying, nil
}
func EmptyResponseMeansNotListening(err error) (interface{}, error) {
	if strings.Contains(err.Error(), "204") {
		return spotify.PlayerState{
			CurrentlyPlaying: spotify.CurrentlyPlaying{
				Playing: false,
			}}, nil
	}
	return nil, err
}
