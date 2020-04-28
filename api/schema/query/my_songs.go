package query

import (
	"fmt"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"log"
)

var MySongsQuery = graphql.Fields{
	"mySongs": &graphql.Field{
		Type: graphql.NewList(ispotify.SavedTrack),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			var main []spotify.SavedTrack
			log.Println("mySongs")
			client, err := ispotify.SpotifyClientFromContext(p.Context)
			if err != nil {
				return main, err
			}
			pace := 40
			for i := 0; i < 1; i++ {
				fmt.Println(i * pace)
				localTracks, err := ispotify.Tracks(i*pace, pace, client)
				if err != nil {
					return main, err
				}
				main = append(main, localTracks...)
			}
			return main, nil
		},
	},
}
