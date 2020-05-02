package query

import (
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/spotify/api/istructql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
)

type Profile struct {
	Name   string          `json:"name"`
	Email  string          `json:"email"`
	Images []spotify.Image `json:"images"`
}

var ProfileQuery = graphql.Fields{
	"profile": &graphql.Field{
		Type: graphql.NewObject(graphql.ObjectConfig{
			Name: "Profile",
			Fields: graphql.Fields{
				"name":   &graphql.Field{Type: graphql.String},
				"email":  &graphql.Field{Type: graphql.String},
				"images": &graphql.Field{Type: graphql.NewList(istructql.GenerateType(spotify.Image{}))},
			},
		}),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := ispotify.SpotifyClientFromContext(p.Context)
			if err != nil {
				return Profile{}, err
			}
			user, err := client.CurrentUser()
			if err != nil {
				return Profile{}, err
			}
			return Profile{
				Name:   user.DisplayName,
				Email:  user.Email,
				Images: user.Images,
			}, nil
		},
	},
}
