package types

import "github.com/graphql-go/graphql"

var availableMarkets = &graphql.Field{
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name:   "AvailableMarkets",
		Fields: graphql.NewList(graphql.String),
	})),
}

var SavedTrackGqlType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SavedTrack",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"uri": &graphql.Field{
			Type: graphql.String,
		},
		"images": &graphql.Field{
			Type: graphql.NewList(image),
		},
	},
})
