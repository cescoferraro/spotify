package query

import (
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
)

var LoggedQuery = graphql.Fields{
	"isLogged": &graphql.Field{
		Type: graphql.Boolean,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			client, err := tools.SpotifyClientFromContext(p.Context)
			if err != nil {
				return false, nil
			}
			_, err = client.CurrentUsersTracks()
			if err != nil {
				return false, nil
			}
			return true, nil
		},
	},
}

