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
		"track": &graphql.Field{
			Type: graphql.NewObject(
				graphql.ObjectConfig{
					Name: "track",
					Fields: graphql.Fields{
						"popularity": &graphql.Field{
							Type: graphql.Int,
						},
						"artists": &graphql.Field{
							Type: graphql.NewList(
								graphql.NewObject(
									graphql.ObjectConfig{
										Name: "artists",
										Fields: graphql.Fields{
											"name": &graphql.Field{
												Type: graphql.String,
											},
											"endpoint": &graphql.Field{
												Type: graphql.String,
											},
										},
									},
								)),
						},
						//"disc-number": &graphql.Field{
						//	Type: graphql.Int,
						//},
						"duration": &graphql.Field{
							Type: graphql.Int,
						},
						"explicit": &graphql.Field{
							Type: graphql.Boolean,
						},
						"endpoint": &graphql.Field{
							Type: graphql.String,
						},
						"name": &graphql.Field{
							Type: graphql.String,
						},
						"previewURL": &graphql.Field{
							Type: graphql.String,
						},
						"trackNumber": &graphql.Field{
							Type: graphql.Int,
						},
						"album": &graphql.Field{
							Type: graphql.NewObject(graphql.ObjectConfig{
								Name: "Album",
								Fields: graphql.Fields{"name": &graphql.Field{
									Type: graphql.String,
								}, "AlbumType": &graphql.Field{
									Type: graphql.String,
								},
									//"AvailableMarkets": &graphql.Field{
									//	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
									//		Name:   "AvailableMarkets",
									//		Fields: graphql.Fields{},
									//	})),
									//},
									"endpoint": &graphql.Field{
										Type: graphql.String,
									},
									"images": &graphql.Field{Type: graphql.NewList(image)}},
							}),
						},
					},
				}),
		},
	},
})
