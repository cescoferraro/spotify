package schema

import (
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/spotify/api/structql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"time"
)

type LocalTest struct {
	Name  []*string `json:"name"`
	Cesco string    `json:"cesco"`
}

type Token struct {
	// AccessToken is the token that authorizes and authenticates
	// the requests.
	AccessToken string `json:"access_token"`

	// TokenType is the type of token.
	// The Type method returns either this or "Bearer", the default.
	TokenType string `json:"token_type"`

	// RefreshToken is a token that's used by the application
	// (as opposed to the user) to refresh the access token
	// if it expires.
	RefreshToken string `json:"refresh_token"`

	// Expiry is the optional expiration time of the access token.
	//
	// If zero, TokenSource implementations will reuse the same
	// token forever and RefreshToken or equivalent
	// mechanisms for that TokenSource will not be used.
	Expiry time.Time `json:"expiry"`

	//// raw optionally contains extra metadata from the server
	//// when updating a token.
	raw interface{}
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
					AccessToken:  "sdfkj",
					TokenType:    "sdfkj",
					RefreshToken: "sdkfj",
					Expiry:       time.Now(),
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
				artists := []spotify.SimpleArtist{{
					Name:     "",
					ID:       "",
					URI:      "",
					Endpoint: "",
				}}
				images := []spotify.Image{{
					Height: 0,
					Width:  0,
					URL:    "",
				}}
				item := spotify.FullTrack{
					SimpleTrack: spotify.SimpleTrack{
						Artists:          artists,
						AvailableMarkets: nil,
						DiscNumber:       0,
						Duration:         0,
						Explicit:         false,
						ExternalURLs:     nil,
						Endpoint:         "",
						ID:               "",
						Name:             "",
						PreviewURL:       "",
						TrackNumber:      0,
						URI:              "",
					},
					Album: spotify.SimpleAlbum{
						Name:             "sdfsdf",
						AlbumType:        "",
						ID:               "",
						URI:              "",
						AvailableMarkets: nil,
						Endpoint:         "",
						Images:           images,
						ExternalURLs:     nil,
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
