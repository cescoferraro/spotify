package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/cescoferraro/structql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
)

type PlaylistsPaginated struct {
	Cursor    int                      `json:"cursor"`
	Total     int                      `json:"total"`
	Playlists []spotify.SimplePlaylist `json:"playlists"`
}

var PlaylistsPaginatedQuery = graphql.Fields{
	"playlistsPaginated": &graphql.Field{
		Type: graphql.NewObject(graphql.ObjectConfig{
			Name: "PlaylistsPaginated",
			Fields: graphql.Fields{
				"cursor": &graphql.Field{Type: graphql.Int},
				"total":  &graphql.Field{Type: graphql.Int},
				"playlists": &graphql.Field{Type: graphql.NewList(
					structql.GenerateType(spotify.SimplePlaylist{
						Images: []spotify.Image{{}},
					}))},
			},
		}),
		Args: graphql.FieldConfigArgument{
			"cursor": &graphql.ArgumentConfig{Type: graphql.Int},
			"pace":   &graphql.ArgumentConfig{Type: graphql.Int},
			"catID":  &graphql.ArgumentConfig{Type: graphql.String},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := ispotify.SpotifyPublicClient()
			if err != nil {
				return MySongsPaginated{}, err
			}
			catID, ok := p.Args["catID"].(string)
			if !ok {
				return MySongsPaginated{}, errors.New("arg catID not found")
			}
			pace, ok := p.Args["pace"].(int)
			if !ok {
				return MySongsPaginated{}, errors.New("arg pace not found")
			}
			cursor, ok := p.Args["cursor"].(int)
			if !ok {
				return "", errors.New("arg state not found")
			}
			localTracks, err := client.GetCategoryPlaylistsOpt(catID, &spotify.Options{
				Limit:  &pace,
				Offset: &cursor,
			})
			if err != nil {
				return localTracks, err
			}
			return PlaylistsPaginated{
				Total:     localTracks.Total,
				Cursor:    cursor + len(localTracks.Playlists),
				Playlists: localTracks.Playlists,
			}, nil
		},
	},
}
