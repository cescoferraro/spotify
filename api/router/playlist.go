package router

import (
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

// GetPLaylists TODO: NEEDS COMMENT INFO
func GetPLaylists(code string, r *http.Request) ([]spotify.SimplePlaylist, error) {
	var playlists = new(spotify.SimplePlaylistPage)
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		return playlists.Playlists, errors.Wrap(err, "retrieveToken")
	}
	client := tools.Auth(r).NewClient(token)
	playlists, err = client.CurrentUsersPlaylists()
	if err != nil {
		return playlists.Playlists, errors.Wrap(err, "client.CurrentUser")
	}
	log.Println(444444444444444)
	log.Println(playlists)
	return playlists.Playlists, nil
}
func playlistEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		log.Println(err.Error())
		return
	}
	user, err := GetPLaylists(body, r)
	if err != nil {
		log.Println(err.Error())
		return
	}
	render.JSON(w, r, user)
}
