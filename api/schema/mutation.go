package schema

import (
	"errors"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"log"
)

var Mutation = graphql.NewObject(
	graphql.ObjectConfig{
		Name:        "Mutation",
		Description: "",
		Interfaces:  nil,
		Fields: graphql.Fields{
			"likeSong": &graphql.Field{
				Type: graphql.Boolean,
				Args: graphql.FieldConfigArgument{
					"id":       &graphql.ArgumentConfig{Type: graphql.String},
					"unfollow": &graphql.ArgumentConfig{Type: graphql.Boolean},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					unfollow, ok := p.Args["unfollow"].(bool)
					if !ok {
						return false, errors.New("arg unfollow not found")
					}
					id, ok := p.Args["id"].(string)
					if !ok {
						return false, errors.New("arg id not found")
					}
					client, err := tools.SpotifyClientFromContext(p.Context)
					if err != nil {
						return false, nil
					}
					if unfollow {
						err = client.RemoveTracksFromLibrary([]spotify.ID{spotify.ID(id)}...)
						if err != nil {
							log.Println(err.Error())
							return false, nil
						}
					} else {
						err = client.AddTracksToLibrary([]spotify.ID{spotify.ID(id)}...)
						if err != nil {
							log.Println(err.Error())
							return false, nil
						}

					}
					return true, nil
				},
			},
			"followPlaylist": &graphql.Field{
				Type: graphql.Boolean,
				Args: graphql.FieldConfigArgument{
					"playlistId": &graphql.ArgumentConfig{Type: graphql.String},
					"owner":      &graphql.ArgumentConfig{Type: graphql.String},
					"unfollow":   &graphql.ArgumentConfig{Type: graphql.Boolean},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					unfollow, ok := p.Args["unfollow"].(bool)
					if !ok {
						return false, errors.New("arg unfollow not found")
					}
					owner, ok := p.Args["owner"].(string)
					if !ok {
						return false, errors.New("arg owner not found")
					}
					playlistId, ok := p.Args["playlistId"].(string)
					if !ok {
						return false, errors.New("arg playlistId not found")
					}
					client, err := tools.SpotifyClientFromContext(p.Context)
					if err != nil {
						return false, nil
					}
					id := spotify.ID(owner)
					playlist := spotify.ID(playlistId)
					if unfollow {
						err = client.UnfollowPlaylist(id, playlist)
						if err != nil {
							log.Println(err.Error())
							return false, nil
						}
					} else {
						err = client.FollowPlaylist(id, playlist, true)
						if err != nil {
							log.Println(err.Error())
							return false, nil
						}

					}
					return true, nil
				},
			},
			"stop": &graphql.Field{
				Type: graphql.Boolean,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					client, err := tools.SpotifyClientFromContext(p.Context)
					if err != nil {
						return false, err
					}
					err = client.Pause()
					if err != nil {
						return false, err
					}
					return true, nil
				},
			},
			"play": &graphql.Field{
				Type: graphql.Boolean,
				Args: graphql.FieldConfigArgument{
					"uri":   &graphql.ArgumentConfig{Type: graphql.String},
					"devID": &graphql.ArgumentConfig{Type: graphql.String},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					client, err := tools.SpotifyClientFromContext(p.Context)
					if err != nil {
						return false, err
					}
					devID, ok := p.Args["devID"].(string)
					if !ok {
						return false, errors.New("arg devID not found")
					}
					uri, ok := p.Args["uri"].(string)
					if !ok {
						return false, errors.New("arg uri not found")
					}
					id := spotify.ID(devID)
					err = client.PlayOpt(&spotify.PlayOptions{
						DeviceID:        &id,
						PlaybackContext: nil,
						URIs:            []spotify.URI{spotify.URI(uri)},
						PlaybackOffset:  nil,
					})
					if err != nil {
						log.Println(345245)
						return false, err
					}
					return true, nil
				},
			},
			"test": &graphql.Field{
				Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return 32, nil
				},
			},
		},
		IsTypeOf: nil,
	},
)
