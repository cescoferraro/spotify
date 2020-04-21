package schema

import "github.com/graphql-go/graphql"

func GenerrateSchema() (graphql.Schema, error) {
	config := graphql.SchemaConfig{Mutation: Mutation, Query: Query}
	return graphql.NewSchema(config)
}
