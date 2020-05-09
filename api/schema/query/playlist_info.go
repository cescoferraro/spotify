package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/structql"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
)

type PlaylistInfo struct {
	Name        string          `json:"name"`
	Description string          `json:"description"`
	Images      []spotify.Image `json:"images"`
}

var PlaylistInfoQuery = graphql.Fields{
	"playlistInfo": &graphql.Field{
		Type: graphql.NewObject(graphql.ObjectConfig{
			Name: "PlaylistInfo",
			Fields: graphql.Fields{
				"name":        &graphql.Field{Type: graphql.String},
				"description": &graphql.Field{Type: graphql.String},
				"images":      &graphql.Field{Type: graphql.NewList(structql.GenerateType(spotify.Image{}))},
			},
		}),
		Args: graphql.FieldConfigArgument{
			"playID": &graphql.ArgumentConfig{Type: graphql.String},
			"owner":  &graphql.ArgumentConfig{Type: graphql.String},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := tools.SpotifyPublicClient()
			if err != nil {
				return PlaylistInfo{}, err
			}
			owner, ok := p.Args["owner"].(string)
			if !ok {
				return PlaylistInfo{}, errors.New("arg owner not found")
			}
			playID, ok := p.Args["playID"].(string)
			if !ok {
				return PlaylistInfo{}, errors.New("arg playID not found")
			}

			localTracks, err := client.GetPlaylistOpt(owner, spotify.ID(playID), "")
			if err != nil {
				return localTracks, err
			}
			return PlaylistInfo{
				Name:        localTracks.Name,
				Description: localTracks.Description,
				Images:      localTracks.Images,
			}, nil
		},
	},
}
