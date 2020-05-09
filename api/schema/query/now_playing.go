package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/structql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"log"
	"strings"
)

var NowPlayingQuery = graphql.Fields{
	"nowPlaying": &graphql.Field{
		Type: structql.GenerateType(spotify.PlayerState{
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
		}),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := tools.SpotifyClientFromContext(p.Context)
			if err != nil {
				return spotify.PlayerState{}, err
			}
			CurrentlyPlaying, err := client.PlayerState()
			if err != nil {
				log.Println(err.Error())
				return EmptyResponseMeansNotListening(errors.New("204"))
			}
			return CurrentlyPlaying, nil
		},
	},
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
