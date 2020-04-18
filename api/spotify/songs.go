package spotify

import (
	"fmt"
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// Getfollowing TODO: NEEDS COMMENT INFO
func Songs(code string) ([]spotify.SavedTrack, error) {
	var main []spotify.SavedTrack
	var err error
	token, err := ProcessToken(code)
	if err != nil {
		return main, errors.Wrap(err, "retrieveToken")
	}
	client := Auth().NewClient(token)

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
