package schema

import (
	"encoding/json"
	"github.com/cescoferraro/spotify/api/schema/types"
	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
	spotify2 "github.com/zmb3/spotify"
	"log"
)

type Song struct {
	Name   string
	URI    string
	Images []spotify2.Image
}

var query = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"login": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return spotify.Auth().AuthURL("dashboard"), nil
			},
		},
		"mySongs": &graphql.Field{
			Type: graphql.NewList(types.SavedTrackGqlType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				user, err := spotify.Songs(p.Context.Value(tools.Key("token")).(string))
				if err != nil {
					log.Println(err.Error())
					return nil, err
				}
				eee, err := json.MarshalIndent(&user[0], "", "    ")
				if err != nil {
					log.Println(err.Error())
					return nil, err
				}
				var result = []Song{}
				for _, song := range user {

					log.Println()
					in := Song{Name: song.FullTrack.Name, Images: song.Album.Images, URI: string(song.FullTrack.URI)}
					result = append(result, in)

				}
				log.Println(string(eee))
				return result, nil
			},
		},
		"me": &graphql.Field{
			Type: types.PrivateUserGqlType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				user, err := spotify.GetProfile(p.Context.Value(tools.Key("token")).(string))
				if err != nil {
					log.Println(err.Error())
					return nil, err
				}
				return user, nil
			},
		},
		"nowPlaying": &graphql.Field{
			Type: types.PlayerStateGqlType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				user, err := spotify.PlayerState(p.Context.Value(tools.Key("token")).(string))
				if err != nil {
					log.Println(err.Error())
					playing := spotify2.CurrentlyPlaying{
						Timestamp:       0,
						PlaybackContext: spotify2.PlaybackContext{},
						Progress:        0,
						Playing:         false,
						Item:            nil,
					}
					djdj := spotify2.PlayerState{CurrentlyPlaying: playing}
					return djdj, err
				}
				hss, err := json.MarshalIndent(user, "", "  ")
				if err != nil {
					log.Println(err.Error())
					return nil, err
				}
				log.Println(string(hss))
				return user, nil
			},
		},
	},
})