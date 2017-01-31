package main

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/src/api/app"
)

var (
	version string
)

func main() {
	r := app.Router(version)
	log.Printf("Starting Spotify API Tester version %s ...", version)
	log.Fatal(http.ListenAndServe(":8080", r))

}
