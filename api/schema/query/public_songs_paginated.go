package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"time"
)

type PublicSongsPaginated struct {
	Cursor int                  `json:"cursor"`
	Total  int                  `json:"total"`
	Songs  []spotify.SavedTrack `json:"yayy"`
}

var PublicSongsPaginatedQuery = graphql.Fields{
	"publicSongsPaginated": &graphql.Field{
		Type: graphql.NewObject(graphql.ObjectConfig{
			Name: "PublicSongsPaginated",
			Fields: graphql.Fields{
				"cursor": &graphql.Field{Type: graphql.Int},
				"total":  &graphql.Field{Type: graphql.Int},
				"songs":  &graphql.Field{Type: graphql.NewList(ispotify.SavedTrack)},
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
			localTracks, err := client.SearchOpt("blues", spotify.SearchTypeTrack, &spotify.Options{
				Limit:  &pace,
				Offset: &cursor,
			})
			if err != nil {
				return localTracks, err
			}
			tracks := localTracks.Tracks.Tracks
			var result []spotify.SavedTrack
			for _, hey := range tracks {
				result = append(result, spotify.SavedTrack{
					AddedAt:   time.Now().String(),
					FullTrack: hey,
				})
			}
			return PublicSongsPaginated{
				Total:  localTracks.Tracks.Total,
				Cursor: cursor + pace,
				Songs:  result,
			}, nil
		},
	},
}
