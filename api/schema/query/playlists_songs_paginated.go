package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"time"
)

var PlaylistsSongsPaginatedQuery = graphql.Fields{
	"PlaylistsSongsPaginated": &graphql.Field{
		Type: MySongsPaginatedQL,
		Args: graphql.FieldConfigArgument{
			"cursor": &graphql.ArgumentConfig{Type: graphql.Int},
			"pace":   &graphql.ArgumentConfig{Type: graphql.Int},
			"playID": &graphql.ArgumentConfig{Type: graphql.String},
			"owner":  &graphql.ArgumentConfig{Type: graphql.String},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := ispotify.SpotifyPublicClient()
			if err != nil {
				return MySongsPaginated{}, err
			}
			owner, ok := p.Args["owner"].(string)
			if !ok {
				return MySongsPaginated{}, errors.New("arg playID not found")
			}
			playID, ok := p.Args["playID"].(string)
			if !ok {
				return MySongsPaginated{}, errors.New("arg playID not found")
			}
			pace, ok := p.Args["pace"].(int)
			if !ok {
				return MySongsPaginated{}, errors.New("arg pace not found")
			}
			cursor, ok := p.Args["cursor"].(int)
			if !ok {
				return "", errors.New("arg state not found")
			}
			localTracks, err := client.GetPlaylistTracksOpt(owner, spotify.ID(playID), &spotify.Options{
				Limit:  &pace,
				Offset: &cursor,
			}, "")
			if err != nil {
				return localTracks, err
			}
			return MySongsPaginated{
				Total:  localTracks.Total,
				Cursor: cursor + len(localTracks.Tracks),
				Songs:  mapSongsPlaylist(localTracks.Tracks),
			}, nil
		},
	},
}

func mapSongsPlaylist(localTracks []spotify.PlaylistTrack) []spotify.SavedTrack {
	result := make([]spotify.SavedTrack, 0)
	for _, hey := range localTracks {
		result = append(result, spotify.SavedTrack{
			AddedAt:   time.Now().String(),
			FullTrack: hey.Track,
		})
	}
	return result
}
