package router

import (
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

// Play TODO: NEEDS COMMENT INFO
func Unfollow(id string, code string, r *http.Request) error {
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := tools.Auth(r).NewClient(token)
	err = client.UnfollowArtist(spotify.ID(id))
	if err != nil {
		return errors.Wrap(err, "play error")
	}
	return nil
}

func unfollowEndPoint(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	token, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	err = Unfollow(id, token, r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	render.JSON(w, r, id)
}
