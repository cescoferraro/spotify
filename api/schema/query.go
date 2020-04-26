package schema

import (
	"context"
	"errors"
	"fmt"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/structql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
	"log"
	"time"
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
		"auth": &graphql.Field{
			Type: structql.GenerateType(oauth2.Token{}),
			Args: graphql.FieldConfigArgument{"code": &graphql.ArgumentConfig{Type: graphql.String}},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				code, ok := p.Args["code"].(string)
				if !ok {
					return oauth2.Token{}, errors.New("arg code not found")
				}
				token, err := ispotify.Auth().Exchange(code)
				if err != nil {
					log.Println(9999)
					return token, err
				}
				return token, nil
			},
		},
		"mySongs": &graphql.Field{
			Type: graphql.NewList(ispotify.SavedTrack),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				log.Println("mySongs")
				token := getOAuthToken(p.Context)
				client := ispotify.Auth().NewClient(token)
				pace := 40
				var main []spotify.SavedTrack
				for i := 0; i < 1; i++ {
					fmt.Println(i * pace)
					localTracks, err := ispotify.Tracks(i*pace, client)
					if err != nil {
						return main, err
					}
					main = append(main, localTracks...)
				}
				return main, nil
			},
		},
		"nowPlaying": &graphql.Field{
			Type: ispotify.PlayerStateGraphQLType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				token := getOAuthToken(p.Context)
				client := ispotify.Auth().NewClient(token)
				CurrentlyPlaying, err := client.PlayerState()
				if err != nil {
					log.Println(err.Error())
					return ispotify.EmptyResponseMeansNotListening(errors.New("204"))
				}
				//return user, nil
				return CurrentlyPlaying, nil
			},
		},
	},
})

func getOAuthToken(ctx context.Context) *oauth2.Token {
	atoken := ctx.Value(tools.Key("access-token")).(string)
	rtoken := ctx.Value(tools.Key("refresh-token")).(string)
	tokenType := ctx.Value(tools.Key("token-type")).(string)
	//expiry := ctx.Value(tools.Key("expiry")).(string)
	token := new(oauth2.Token)
	token.AccessToken = atoken
	token.RefreshToken = rtoken
	token.Expiry = time.Now()
	token.TokenType = tokenType
	return token
}
