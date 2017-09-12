package router

import (
	"bytes"
	"log"
	"net/http"

	"strings"

	"github.com/cescoferraro/spotify/api/app"
	"github.com/cescoferraro/spotify/api/artist"
	"github.com/cescoferraro/spotify/api/following"
	"github.com/cescoferraro/spotify/api/player"
	"github.com/cescoferraro/spotify/api/playlists"
	"github.com/cescoferraro/spotify/api/profile"
	"github.com/cescoferraro/spotify/api/songs"
	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
)

// Router TODO: NEEDS COMMENT INFO
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
	r.Get("/callback", func(w http.ResponseWriter, r *http.Request) {
		var buffer bytes.Buffer
		if tools.IsProd() {
			buffer.WriteString("http://spotify.cescoferraro.xyz/auth/")
		} else {
			buffer.WriteString("http://" + strings.Split(r.Host, ":")[0] + ":5000/auth/")
		}
		code := r.URL.Query().Get("code")
		state := r.URL.Query().Get("state")
		if r.URL.RawQuery != "" {
			go tools.ProcessToken(code, r)
			buffer.WriteString(code + "/" + state)
		}
		log.Println(r.URL.Query().Get("state"))
		log.Println("redirenting to " + buffer.String())
		http.Redirect(w, r, buffer.String(), http.StatusTemporaryRedirect)
	})
	return r
}
