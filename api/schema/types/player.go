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
				Type: graphql.NewObject(graphql.ObjectConfig{
					Name: "Device",
					Fields: graphql.Fields{"Active": &graphql.Field{
						Type: graphql.Boolean,
					}, "Restricted": &graphql.Field{
						Type: graphql.Boolean,
					}, "Name": &graphql.Field{
						Type: graphql.String,
					}, "Type": &graphql.Field{
						Type: graphql.String,
					}, "Volume": &graphql.Field{
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
			Type: graphql.NewList(
				graphql.NewObject(graphql.ObjectConfig{
					Name: "Images",
					Fields: graphql.Fields{
						"Height": &graphql.Field{
							Type: graphql.Int,
						},
						"Width": &graphql.Field{
							Type: graphql.Int,
						},
						"URL": &graphql.Field{
							Type: graphql.String,
						}},
				})),
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
