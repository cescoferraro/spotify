package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
)

var FollowPlaylist = graphql.Fields{
	"followPlaylist": &graphql.Field{
		Type: graphql.Boolean,
		Args: graphql.FieldConfigArgument{
			"playlistId": &graphql.ArgumentConfig{Type: graphql.String},
			"owner": &graphql.ArgumentConfig{Type: graphql.String},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			owner, ok := p.Args["owner"].(string)
			if !ok {
				return PlaylistInfo{}, errors.New("arg owner not found")
			}
			playlistId, ok := p.Args["playlistId"].(string)
			if !ok {
				return PlaylistInfo{}, errors.New("arg playlistId not found")
			}
			client, err := tools.SpotifyClientFromContext(p.Context)
			if err != nil {
				return false, nil
			}
			playlists, err := client.CurrentUsersPlaylists()
			if err != nil {
				return false, nil
			}
			for _, playlist := range playlists.Playlists {
				if playlist.ID == spotify.ID(playlistId) {
					return true, nil
				}
			}
			return false, nil
		},
	},
}
