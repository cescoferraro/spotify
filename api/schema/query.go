package schema

import (
	"errors"
	"fmt"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/structql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
	"log"
)

var Query = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"login": &graphql.Field{
			Type: graphql.String,
			Args: graphql.FieldConfigArgument{"state": &graphql.ArgumentConfig{Type: graphql.String}},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				state, ok := p.Args["state"].(string)
				if !ok {
					return "", errors.New("arg state not found")
				}
				return ispotify.Auth().AuthURL(state), nil
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
				var main []spotify.SavedTrack
				log.Println("mySongs")
				client, err := ispotify.SpotifyClientFromContext(p.Context)
				if err != nil {
					return main, err
				}
				pace := 40
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
				client, err := ispotify.SpotifyClientFromContext(p.Context)
				if err != nil {
					return spotify.PlayerState{}, err
				}
				CurrentlyPlaying, err := client.PlayerState()
				if err != nil {
					log.Println(err.Error())
					return ispotify.EmptyResponseMeansNotListening(errors.New("204"))
				}
				return CurrentlyPlaying, nil
			},
		},
	},
})
