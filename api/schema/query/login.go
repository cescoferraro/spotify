package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/graphql-go/graphql"
)

var LoginQuery = graphql.Fields{
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
}
