package router

import (
	"github.com/cescoferraro/spotify/api/app"
	"github.com/cescoferraro/spotify/api/artist"
	"github.com/cescoferraro/spotify/api/following"
	"github.com/cescoferraro/spotify/api/player"
	"github.com/cescoferraro/spotify/api/playlists"
	"github.com/cescoferraro/spotify/api/profile"
	"github.com/cescoferraro/spotify/api/songs"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/spotify/api/youtube"
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
)

// Endpoints TODO: NEEDS COMMENT INFO
func Endpoints(version string) chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.Logger, tools.Cors)
	player.RegisterPlayerEndpoints("/player", r)
	artist.RegisterArtistEndpoints("/artist", r)
	following.RegisterFollowingEndpoints("/following", r)
	playlists.RegisterPlaylistsEndpoints("/playlists", r)
	profile.RegisterProfileEndpoints("/profile", r)
	songs.RegisterProfileEndpoints("/songs", r)
	app.RegisterAppEndpoints("/app", version, r)
	r.Get("/yt", youtube.LOGIN)
	r.Get("/youtube", youtube.CALLBACK)
	r.Get("/callback", CallBackEndPoint)
	return r
}
