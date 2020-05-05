package schema

import (
	"github.com/cescoferraro/spotify/api/schema/query"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
)

func Query() *graphql.Object {
	fields := tools.MergeGraphQlQuery(query.LoginQuery, query.AuthQuery)

	// dashbard
	fields = tools.MergeGraphQlQuery(fields, query.NowPlayingQuery)
	fields = tools.MergeGraphQlQuery(fields, query.MySongsPaginatedQuery)

	fields = tools.MergeGraphQlQuery(fields, query.PublicSongsPaginatedQuery)

	fields = tools.MergeGraphQlQuery(fields, query.CategoriesPaginatedQuery)
	fields = tools.MergeGraphQlQuery(fields, query.PlaylistsPaginatedQuery)
	fields = tools.MergeGraphQlQuery(fields, query.PlaylistSongsPaginatedQuery)
	fields = tools.MergeGraphQlQuery(fields, query.ProfileQuery)
	fields = tools.MergeGraphQlQuery(fields, query.PlaylistInfoQuery)

	return graphql.NewObject(graphql.ObjectConfig{Name: "Query", Fields: fields})
}
