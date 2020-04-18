package endpoints

import (
	"net/http"

	"github.com/go-chi/render"
)

func VersionEndPoint(version string) func(http.ResponseWriter, *http.Request) {
	if version == "" {
		version = "NOT SET"
	}
	return func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, version)
	}
}
