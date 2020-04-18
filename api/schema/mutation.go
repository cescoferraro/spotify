package schema

import "github.com/graphql-go/graphql"

var mutation = graphql.NewObject(
	graphql.ObjectConfig{
		Name:        "Mutation",
		Description: "",
		Interfaces:  nil,
		Fields: graphql.Fields{
			"test": &graphql.Field{
				Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return 32, nil
				},
			},
		},
		IsTypeOf: nil,
	},
)
