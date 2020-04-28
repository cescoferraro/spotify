package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/structql"
	"github.com/graphql-go/graphql"
	"golang.org/x/oauth2"
	"log"
)

var AuthQuery = graphql.Fields{
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
}
