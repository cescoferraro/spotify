package schema

import (
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
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
