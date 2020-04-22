package schema

import (
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/structql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"time"
)

type Whatever struct {
	Whatever string `json:"whatever"`
}
type LocalTest struct {
	Cesco    string    `json:"cesco"`
	Whatever *Whatever `json:"whatever"`
}

type Token struct {
	Code string `json:"code"`

	Max int `json:"max"`

	Valid bool `json:"valid"`

	Expiry time.Time `json:"expiry"`

	Data Data `json:"data"`
}

type Data struct {
	Name string `json:"name"`

	Trys int `json:"trys"`

	Valid bool `json:"valid"`

	Expiry time.Time `json:"expiry"`
}

var Query = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"login": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return ispotify.Auth().AuthURL("dashboard"), nil
			},
		},
		"token": &graphql.Field{
			Type: structql.GenerateType(Token{}),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return Token{
					Code:   "super-secret",
					Max:    2,
					Valid:  false,
					Expiry: time.Now(),
					Data: Data{
						Name:   "yay",
						Trys:   40,
						Valid:  true,
						Expiry: time.Now(),
					},
				}, nil
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
				//token := p.Context.Value(tools.Key("token")).(string)
				//user, err := ispotify.PlayerState(token)
				//if err != nil {
				//	return ispotify.EmptyResponseMeansNotListening(err, user)
				//}
				artists := []spotify.SimpleArtist{{}}
				images := []spotify.Image{{}}
				item := spotify.FullTrack{
					SimpleTrack: spotify.SimpleTrack{
						Artists:          artists,
						AvailableMarkets: nil,
						URI:              "",
					},
					Album: spotify.SimpleAlbum{
						Name:   "sdfsdf",
						Images: images,
					},
					ExternalIDs: nil,
					Popularity:  3230,
				}
				return spotify.PlayerState{
					CurrentlyPlaying: spotify.CurrentlyPlaying{
						Timestamp: 0,
						PlaybackContext: spotify.PlaybackContext{
							Endpoint: "",
							Type:     "",
							URI:      "",
						},
						Progress: 0,
						Playing:  false,
						Item:     &item,
					},
					Device: spotify.PlayerDevice{
						ID:         "",
						Active:     false,
						Restricted: false,
						Name:       "dev",
						Type:       "",
						Volume:     0,
					},
					ShuffleState: false,
					RepeatState:  "",
				}, nil
			},
		},
	},
})
