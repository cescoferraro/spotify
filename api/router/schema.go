package router

import (
	"github.com/SonicRoshan/straf"
	"github.com/cescoferraro/spotify/api/spotify"
	"log"

	gqlstruct "github.com/lab259/go-graphql-struct"

	og "github.com/zmb3/spotify"

	"github.com/graphql-go/graphql"
)

// Post  dsjn
type Post struct {
	ID    int `json:"id" graphql:"id"`
	Likes int `json:"likes" graphql:"likes"`
}

var posts = []*Post{
	{ID: 1, Likes: 1},
	{ID: 4, Likes: 8},
	{ID: 2, Likes: 2},
}

func schemaConfig() (graphql.SchemaConfig, error) {
	log.Println(3433)
	userType, err := straf.GetGraphQLObject(Post{})
	if err != nil {
		return graphql.SchemaConfig{}, err
	}
	//now, err := straf.GetGraphQLObject({})
	now := gqlstruct.Struct(&og.PlayerState{})
	if err != nil {
		return graphql.SchemaConfig{}, err
	}
	return graphql.SchemaConfig{
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name: "Query",
			Fields: graphql.Fields{
				"posts": &graphql.Field{
					Type: graphql.NewList(userType),
					Args: graphql.FieldConfigArgument{
						"token": &graphql.ArgumentConfig{
							Type: graphql.String,
						},
					},
					Resolve: func(p graphql.ResolveParams) (interface{}, error) {
						log.Println((p.Context.Value(key("token"))))
						log.Println("======")
						return posts, nil
					},
				},
				"now": &graphql.Field{
					Type: now,
					Resolve: func(p graphql.ResolveParams) (interface{}, error) {
						token := p.Context.Value(key("token")).(string)
						log.Println(token)
						user, err := spotify.PlayerState(token)
						if err != nil {
							log.Println(err.Error())
						}
						return user, nil
					},
				},
			},
		}),
	}, nil
}
