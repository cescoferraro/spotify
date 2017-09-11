package router

import (
	"fmt"
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

// Getfollowing TODO: NEEDS COMMENT INFO
func Songs(code string, r *http.Request) ([]spotify.SavedTrack, error) {
	var main []spotify.SavedTrack
	var err error
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		return main, errors.Wrap(err, "retrieveToken")
	}
	client := tools.Auth(r).NewClient(token)

	total, err := TotalTracks(client)
	if err != nil {
		return main, errors.Wrap(err, "client.CurrentUser")
	}
	for i := 0; i <= total/40; i++ {
		fmt.Println(i * 40)
		localTracks, err := Tracks(client)
		if err != nil {
			return main, errors.Wrap(err, "client.CurrentUser")
		}
		main = append(main, localTracks...)

	}
	fmt.Println(total)
	fmt.Println(main)
	return main, nil
}

func TotalTracks(client spotify.Client) (int, error) {
	num := int(1)
	tracks, err := client.CurrentUsersTracksOpt(&spotify.Options{
		Limit: &num,
	})
	if err != nil {
		return 0, err
	}
	return tracks.Total, nil
}

func Tracks(client spotify.Client) ([]spotify.SavedTrack, error) {
	num := int(40)
	var track []spotify.SavedTrack
	tracks, err := client.CurrentUsersTracksOpt(&spotify.Options{
		Limit: &num,
	})
	if err != nil {
		return track, err
	}
	return tracks.Tracks, nil
}

func songsEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
		return
	}
	user, err := Songs(body, r)
	if err != nil {
		http.Error(w, err.Error(), 401)
		return
	}
	render.JSON(w, r, user)
}
