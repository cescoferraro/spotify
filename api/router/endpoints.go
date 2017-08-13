package router

import (
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
)

// Router TODO: NEEDS COMMENT INFO
func Endpoints(version string) chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.Logger, tools.Cors)
	r.Post("/repeat/{state}", repeatEndPoint)
	r.Post("/play", playEndPoint)
	r.Post("/play/{id}", playSongEndPoint)
	r.Get("/login", loginEndPoint)
	r.Get("/status", statusEndPoint)
	r.Post("/playlists", playlistEndPoint)
	r.Post("/pause", pauseEndPoint)
	r.Post("/previous", previousEndPoint)
	r.Post("/next", nextEndPoint)
	r.Post("/following", followingEndPoint)
	r.Post("/me", meEndPoint)
	r.Get("/logout", logoutEndPoint)
	r.Get("/version", versionEndPoint(version))
	r.HandleFunc("/", rootEndPoint)
	return r
}
