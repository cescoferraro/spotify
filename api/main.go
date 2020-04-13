package main

import (
	"github.com/cescoferraro/spotify/api/graphql"
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/router"
)

var version string

func main() {
	r := router.Endpoints(version)
	graphql.NewGraphQLL(r)
	log.Printf("cescco Starting Spotify API Tester version %s ...", version)
	log.Fatal(http.ListenAndServe("0.0.0.0:8080", r))
}
