package main

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/router"
)

var version string

func main() {
	r := router.Endpoints(version)
	log.Printf("Starting Spotify API Tester version %s ...", version)
	log.Fatal(http.ListenAndServe(":8080", r))
}
