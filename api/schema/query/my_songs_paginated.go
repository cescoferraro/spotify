package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/spotify/api/istructql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
)

type SavedTrack struct {
	Name string `json:"name"`
}

type MySongsPaginated struct {
	Cursor int                  `json:"cursor"`
	Total  int                  `json:"total"`
	Songs  []spotify.SavedTrack `json:"songs"`
}

var MySongsPaginatedQL = graphql.NewObject(graphql.ObjectConfig{
	Name: "MySongsPaginated",
	Fields: graphql.Fields{
		"cursor": &graphql.Field{Type: graphql.Int},
		"total":  &graphql.Field{Type: graphql.Int},
		"songs":  &graphql.Field{Type: graphql.NewList(ispotify.SavedTrack)},
	},
})
var MySongsPaginatedQuery = graphql.Fields{
	"mySongsPaginated": &graphql.Field{
		Type: MySongsPaginatedQL,
		Args: graphql.FieldConfigArgument{
			"cursor": &graphql.ArgumentConfig{Type: graphql.Int},
			"pace":   &graphql.ArgumentConfig{Type: graphql.Int},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := ispotify.SpotifyClientFromContext(p.Context)
			if err != nil {
				return MySongsPaginated{}, err
			}
			pace, ok := p.Args["pace"].(int)
			if !ok {
				return MySongsPaginated{}, errors.New("arg pace not found")
			}
			cursor, ok := p.Args["cursor"].(int)
			if !ok {
				return MySongsPaginated{}, errors.New("arg state not found")
			}
			localTracks, err := client.CurrentUsersTracksOpt(&spotify.Options{
				Offset: &cursor,
				Limit:  &pace,
			})
			if err != nil {
				return MySongsPaginated{}, err
			}
			return MySongsPaginated{
				Total:  localTracks.Total,
				Cursor: cursor + len(localTracks.Tracks),
				Songs:  localTracks.Tracks,
			}, nil
		},
	},
}
var MyDevicesQuery = graphql.Fields{
	"myDevices": &graphql.Field{
		Type: graphql.NewList(istructql.GenerateType(spotify.PlayerDevice{})),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := ispotify.SpotifyClientFromContext(p.Context)
			if err != nil {
				return []spotify.PlayerDevice{}, err
			}
			devices, err := client.PlayerDevices()
			if err != nil {
				return []spotify.PlayerDevice{}, err
			}
			return devices, nil
		},
	},
}
