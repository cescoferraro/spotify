package graphql

import (
	"log"

	"github.com/graphql-go/graphql"
)

// Post TODO: NEEDS COMMENT INFO
type Post struct {
	ID    int `json:"id"`
	Likes int `json:"count"`
}

var posts = []*Post{
	&Post{ID: 1, Likes: 1},
	&Post{ID: 4, Likes: 8},
	&Post{ID: 2, Likes: 2},
}

// PostType TODO: NEEDS COMMENT INFO
var PostType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Post",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"likes": &graphql.Field{
			Type: graphql.Int,
		},
	},
})

var schemaConfig = graphql.SchemaConfig{
	Query: graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"addPost": &graphql.Field{
				Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					posts = append(posts, &Post{ID: 5, Likes: 999})
					return "ok", nil
				},
			},
			"posts": &graphql.Field{
				Type: graphql.NewList(PostType),
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
		},
	}),
	Subscription: graphql.NewObject(graphql.ObjectConfig{
		Name: "Subscription",
		Fields: graphql.Fields{
			"posts": &graphql.Field{
				Type: graphql.NewList(PostType),
				Args: graphql.FieldConfigArgument{
					"collection": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					log.Println((p.Context.Value(key("token"))))
					log.Println("======")
					return posts, nil
				},
			},
		},
	}),
}
