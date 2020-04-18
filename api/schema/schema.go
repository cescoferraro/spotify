package schema

import (
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
	"github.com/zmb3/spotify"
	"log"
)

func Generator() graphql.Schema {
	config := graphql.SchemaConfig{Mutation: mutation, Query: query}
	ischema, err := graphql.NewSchema(config)
	if err != nil {
		log.Fatal(err)
	}
	tools.GetRootDescription(spotify.SavedTrack{})
	return ischema
}
