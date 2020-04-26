package schema

import (
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/structql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
)

var Query = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"login": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return ispotify.Auth().AuthURL("dashboard"), nil
			},
		},
		"test": &graphql.Field{
			Type: structql.GenerateType(spotify.SimpleArtist{}),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return spotify.SimpleArtist{
					Name:     "sdkjf",
					ID:       "sdfk",
					URI:      "sdkfj",
					Endpoint: "osdf",
				}, nil
			},
		},
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
				token := p.Context.Value(tools.Key("token")).(string)
				user, err := ispotify.PlayerState(token)
				if err != nil {
					return ispotify.EmptyResponseMeansNotListening(err, user)
				}
				return user, nil
			},
		},
	},
})
