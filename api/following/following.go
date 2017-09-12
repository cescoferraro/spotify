package following

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

// Getfollowing TODO: NEEDS COMMENT INFO
func Getfollowing(code string, r *http.Request) (*spotify.FullArtistCursorPage, error) {
	var artists *spotify.FullArtistCursorPage
	var err error
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		return artists, errors.Wrap(err, "retrieveToken")
	}
	client := tools.Auth(r).NewClient(token)
	artists, err = client.CurrentUsersFollowedArtists()
	if err != nil {
		return artists, errors.Wrap(err, "client.CurrentUser")
	}
	return artists, nil
}
func followingEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	user, err := Getfollowing(body, r)
	if err != nil {
		http.Error(w, http.StatusText(401), 401)
		return
	}
	render.JSON(w, r, user)
}
