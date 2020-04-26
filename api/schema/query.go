package schema

import (
	"encoding/json"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
	"log"
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
		"mySongs": &graphql.Field{
			Type: graphql.NewList(ispotify.SavedTrack),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				token := p.Context.Value(tools.Key("token")).(string)
				user, err := ispotify.Songs(token)
				if err != nil {
					return ispotify.EmptyResponseMeansNotListening(err, user)
				}
				www, err := json.MarshalIndent(user, "", "  ")
				if err != nil {
					return user, err
				}
				log.Println(string(www))
				return user, nil
			},
		},
		"nowPlaying": &graphql.Field{
			Type: ispotify.PlayerStateGraphQLType,
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
