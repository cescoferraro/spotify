package query

import (
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
	"log"
)

var LikedSongs = graphql.Fields{
	"likedSongs": &graphql.Field{
		Type: graphql.NewList(graphql.String),
		Args: graphql.FieldConfigArgument{
			"ids": &graphql.ArgumentConfig{Type: graphql.NewList(graphql.String)},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			ids := []string{}
			idsReq := p.Args["ids"].([]interface{})
			for _, v := range idsReq {
				elems := v.(string)
				log.Println(elems)
				ids = append(ids, elems)
			}
			client, err := tools.SpotifyClientFromContext(p.Context)
			if err != nil {
				return ids, err
			}
			all, err := client.CurrentUsersTracks()
			if err != nil {
				return ids, err
			}
			result := []string{}
			for _, track := range all.Tracks {
				if tools.Contains(ids, track.ID.String()) {
					result = append(result, track.ID.String())
				}

			}
			return result, nil
		},
	},
}
