package types

import "github.com/graphql-go/graphql"

var image = graphql.NewObject(graphql.ObjectConfig{
	Name: "images",
	Fields: graphql.Fields{
		"height": &graphql.Field{
			Type: graphql.Int,
		},
		"width": &graphql.Field{
			Type: graphql.Int,
		},
		"url": &graphql.Field{
			Type: graphql.String,
		}},
})

var PrivateUserGqlType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PrivateUser",
	Fields: graphql.Fields{
		"DisplayName": &graphql.Field{
			Type: graphql.String,
		},
		"Followers": &graphql.Field{
			Type: graphql.NewObject(graphql.ObjectConfig{
				Name: "Followers",
				Fields: graphql.Fields{"Endpoint": &graphql.Field{
					Type: graphql.String,
				}},
			}),
		},
		"Endpoint": &graphql.Field{
			Type: graphql.String,
		},
		"URI": &graphql.Field{
			Type: graphql.String,
		},
		"ID": &graphql.Field{
			Type: graphql.String,
		},
		"Images": &graphql.Field{
			Type: graphql.NewList(image),
		},
		"Country": &graphql.Field{
			Type: graphql.String,
		},
		"Email": &graphql.Field{
			Type: graphql.String,
		},
		"Product": &graphql.Field{
			Type: graphql.String,
		},
		"Birthdate": &graphql.Field{
			Type: graphql.String,
		},
	},
})
