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
	r.Post("/unfollow/{id}", unfollowEndPoint)
	r.Post("/play/playlist", playPlaylistEndPoint)
	r.Post("/volume/{percent}", volumeEndPoint)
	r.Get("/login", loginEndPoint("dashboard"))
	r.Get("/artist/{move}/{id}", artistloginEndPoint("anitta"))
	r.Post("/love/{id}", anittaEndPoint(true))
	r.Post("/hate/{id}", anittaEndPoint(false))
	r.Post("/label/{id}", labelEndPoint)
	r.Get("/status", statusEndPoint)
	r.Post("/playlists", playlistEndPoint)
	r.Post("/pause", pauseEndPoint)
	r.Post("/previous", previousEndPoint)
	r.Post("/next", nextEndPoint)
	r.Post("/following", followingEndPoint)
	r.Post("/songs", songsEndPoint)
	r.Post("/me", meEndPoint)
	r.Post("/logout", logoutEndPoint)
	r.Get("/now", nowPlayingEndPoint)
	r.Get("/version", versionEndPoint(version))
	r.HandleFunc("/auth", rootEndPoint)
	return r
}
