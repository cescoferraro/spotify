package types

import "github.com/graphql-go/graphql"

var PlayerStateGqlType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "PlayerState",
		Fields: graphql.Fields{
			"Timestamp": &graphql.Field{Type: graphql.Int},
			"PlaybackContext": &graphql.Field{
				Type: graphql.NewObject(graphql.ObjectConfig{
					Name: "PlaybackContext",
					Fields: graphql.Fields{
						"Endpoint": &graphql.Field{
							Type: graphql.String,
						}, "Type": &graphql.Field{
							Type: graphql.String,
						}},
				}),
			},
			"Progress": &graphql.Field{
				Type: graphql.Int,
			},
			"Playing": &graphql.Field{
				Type: graphql.Boolean,
			},
			"Device": &graphql.Field{
				Type: graphql.NewObject(
					graphql.ObjectConfig{
						Name: "Device",
						Fields: graphql.Fields{
							"Active": &graphql.Field{
								Type: graphql.Boolean,
							},
							"Restricted": &graphql.Field{
								Type: graphql.Boolean,
							},
							"Name": &graphql.Field{
								Type: graphql.String,
							},
							"Type": &graphql.Field{
								Type: graphql.String,
							},
							"Volume": &graphql.Field{
								Type: graphql.Int,
							}},
					}),
			},
			"ShuffleState": &graphql.Field{
				Type: graphql.Boolean,
			},
			"RepeatState": &graphql.Field{
				Type: graphql.String,
			},
		},
	})
