package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"log"
)

type SavedTrack struct {
	Name string `json:"name"`
}

type MySongsPaginated struct {
	Cursor int                  `json:"cursor"`
	Total  int                  `json:"total"`
	Songs  []spotify.SavedTrack `json:"yayy"`
}

var MySongsPaginatedQuery = graphql.Fields{
	"mySongsPaginated": &graphql.Field{
		Type: graphql.NewObject(graphql.ObjectConfig{
			Name: "MySongsPaginated",
			Fields: graphql.Fields{
				"cursor": &graphql.Field{Type: graphql.Int},
				"total":  &graphql.Field{Type: graphql.Int},
				"songs":  &graphql.Field{Type: graphql.NewList(ispotify.SavedTrack)},
			},
		}),
		Args: graphql.FieldConfigArgument{"cursor": &graphql.ArgumentConfig{Type: graphql.Int}},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			log.Println("mySongsPaginated")
			client, err := ispotify.SpotifyClientFromContext(p.Context)
			if err != nil {
				return MySongsPaginated{}, err
			}
			total, err := ispotify.TotalTracks(client)
			if err != nil {
				return MySongsPaginated{}, err
			}

			cursor, ok := p.Args["cursor"].(int)
			if !ok {
				return "", errors.New("arg state not found")
			}
			log.Println(cursor)
			var main []spotify.SavedTrack
			pace := 40
			localTracks, err := ispotify.Tracks(cursor, pace, client)
			if err != nil {
				return main, err
			}
			main = append(main, localTracks...)
			return MySongsPaginated{
				Total:  total,
				Cursor: cursor + pace,
				Songs:  main,
			}, nil
		},
	},
}
