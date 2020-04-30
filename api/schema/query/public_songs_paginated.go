package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"time"
)

var PublicSongsPaginatedQuery = graphql.Fields{
	"publicSongsPaginated": &graphql.Field{
		Type: MySongsPaginatedQL,
		Args: graphql.FieldConfigArgument{
			"query":  &graphql.ArgumentConfig{Type: graphql.String},
			"cursor": &graphql.ArgumentConfig{Type: graphql.Int},
			"pace":   &graphql.ArgumentConfig{Type: graphql.Int},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := ispotify.SpotifyPublicClient()
			if err != nil {
				return MySongsPaginated{}, err
			}
			query, ok := p.Args["query"].(string)
			if !ok {
				return MySongsPaginated{}, errors.New("arg query not found")
			}
			pace, ok := p.Args["pace"].(int)
			if !ok {
				return MySongsPaginated{}, errors.New("arg pace not found")
			}
			cursor, ok := p.Args["cursor"].(int)
			if !ok {
				return "", errors.New("arg state not found")
			}
			localTracks, err := client.SearchOpt(query, spotify.SearchTypeTrack, &spotify.Options{
				Limit:  &pace,
				Offset: &cursor,
			})
			if err != nil {
				return localTracks, err
			}
			return MySongsPaginated{
				Total:  localTracks.Tracks.Total,
				Cursor: cursor + len(localTracks.Tracks.Tracks),
				Songs:  mapSongs(localTracks.Tracks.Tracks),
			}, nil
		},
	},
}

func mapSongs(localTracks []spotify.FullTrack) []spotify.SavedTrack {
	result := make([]spotify.SavedTrack, 0)
	for _, hey := range localTracks {
		result = append(result, spotify.SavedTrack{
			AddedAt:   time.Now().String(),
			FullTrack: hey,
		})
	}
	return result
}
