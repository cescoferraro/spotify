package query

import (
	"errors"
	"github.com/cescoferraro/spotify/api/ispotify"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"log"
)

var NowPlayingQuery = graphql.Fields{
	"nowPlaying": &graphql.Field{
		Type: ispotify.PlayerStateGraphQLType,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := ispotify.SpotifyClientFromContext(p.Context)
			if err != nil {
				return spotify.PlayerState{}, err
			}
			CurrentlyPlaying, err := client.PlayerState()
			if err != nil {
				log.Println(err.Error())
				return ispotify.EmptyResponseMeansNotListening(errors.New("204"))
			}
			return CurrentlyPlaying, nil
		},
	},
}
