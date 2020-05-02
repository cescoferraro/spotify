package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/spotify/api/istructql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
)

type CategoriesPaginated struct {
	Cursor     int                `json:"cursor"`
	Total      int                `json:"total"`
	Categories []spotify.Category `json:"categories"`
}

var CategoriesPaginatedQuery = graphql.Fields{
	"categoriesPaginated": &graphql.Field{
		Type: graphql.NewObject(graphql.ObjectConfig{
			Name: "CategoriesPaginated",
			Fields: graphql.Fields{
				"cursor": &graphql.Field{Type: graphql.Int},
				"total":  &graphql.Field{Type: graphql.Int},
				"categories": &graphql.Field{Type: graphql.NewList(
					istructql.GenerateType(spotify.Category{
						Icons: []spotify.Image{{}},
					}))},
			},
		}),
		Args: graphql.FieldConfigArgument{
			"cursor": &graphql.ArgumentConfig{Type: graphql.Int},
			"pace":   &graphql.ArgumentConfig{Type: graphql.Int},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := ispotify.SpotifyPublicClient()
			if err != nil {
				return MySongsPaginated{}, err
			}
			pace, ok := p.Args["pace"].(int)
			if !ok {
				return MySongsPaginated{}, errors.New("arg pace not found")
			}
			cursor, ok := p.Args["cursor"].(int)
			if !ok {
				return "", errors.New("arg state not found")
			}
			localTracks, err := client.GetCategoriesOpt(&spotify.Options{
				Limit:  &pace,
				Offset: &cursor,
			}, "pt")
			if err != nil {
				return localTracks, err
			}
			return CategoriesPaginated{
				Total:      localTracks.Total,
				Cursor:     cursor + len(localTracks.Categories),
				Categories: localTracks.Categories,
			}, nil
		},
	},
}
