package router

import (
	"net/http"

	"github.com/go-chi/render"
)

func versionEndPoint(version string) func(http.ResponseWriter, *http.Request) {
	if version == "" {
		version = "NOT SET"
	}
	return func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, version)
	}
}
