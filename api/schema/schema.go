package schema

import (
	"encoding/json"
	"github.com/cescoferraro/spotify/api/schema/types"
	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/graphql-go/graphql"
	"log"
)

func FuncName() graphql.Schema {
	config, err := SchemaConfig()
	if err != nil {
		log.Fatal(err)
	}
	ischema, err := graphql.NewSchema(config)
	if err != nil {
		log.Fatal(err)
	}
	return ischema
}

func SchemaConfig() (graphql.SchemaConfig, error) {
	//getRootDescription(og.CurrentlyPlaying{})
	//getRootDescription(og.PrivateUser{})
	return graphql.SchemaConfig{
		Mutation: graphql.NewObject(
			graphql.ObjectConfig{
				Name:        "Mutation",
				Description: "",
				Interfaces:  nil,
				Fields: graphql.Fields{
					"test": &graphql.Field{
						Type: graphql.String,
						Resolve: func(p graphql.ResolveParams) (interface{}, error) {
							return 32, nil
						},
					},
				},
				IsTypeOf: nil,
			},
		),
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name: "Query",
			Fields: graphql.Fields{
				"login": &graphql.Field{
					Type: graphql.String,
					Resolve: func(p graphql.ResolveParams) (interface{}, error) {
						return spotify.Auth().AuthURL("dashboard"), nil
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
							return nil, err
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
		}),
	}, nil
}
