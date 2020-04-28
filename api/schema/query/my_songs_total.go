package query

import (
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/graphql-go/graphql"
	"log"
)

var MySongsTotalQuery = graphql.Fields{
	"mySongsTotal": &graphql.Field{
		Type: graphql.Int,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			log.Println("mySongs")
			client, err := ispotify.SpotifyClientFromContext(p.Context)
			if err != nil {
				return 0, err
			}
			localTracks, err := ispotify.TotalTracks(client)
			if err != nil {
				return 0, err
			}
			return localTracks, nil
		},
	},
}
