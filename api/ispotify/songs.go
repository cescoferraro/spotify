package ispotify

import (
	"fmt"
	"github.com/cescoferraro/structql"
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
	"time"
)

var SavedTrack = structql.GenerateType(spotify.SavedTrack{
	AddedAt: "",
	FullTrack: spotify.FullTrack{
		SimpleTrack: spotify.SimpleTrack{
			Artists:          []spotify.SimpleArtist{},
			AvailableMarkets: []string{""},
		},
		Album: spotify.SimpleAlbum{
			AvailableMarkets: []string{""},
			Images:           []spotify.Image{{}},
		},
	},
})

// Getfollowing TODO: NEEDS COMMENT INFO
func Songs(code string) ([]spotify.SavedTrack, error) {
	var main []spotify.SavedTrack
	//var err error
	//token, err := ProcessToken(code)
	//if err != nil {
	//	return main, errors.Wrap(err, "retrieveToken")
	//}
	//token, err := Auth().Token(code, r)
	//if err != nil {
	//	return main, errors.Wrap(err, "retrieveToken")
	//}
	token := new(oauth2.Token)
	token.AccessToken = code
	token.RefreshToken = code
	token.Expiry = time.Now()
	token.TokenType = "credencial"
	client := Auth().NewClient(token)
	//
	pace := 40
	total, err := TotalTracks(client)
	if err != nil {
		return main, errors.Wrap(err, "client.CurrentUser")
	}
	for i := 0; i < 1; i++ {
		fmt.Println(i * pace)
		localTracks, err := Tracks(i*pace, client)
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

func Tracks(offeset int, client spotify.Client) ([]spotify.SavedTrack, error) {
	num := int(40)
	var track []spotify.SavedTrack
	tracks, err := client.CurrentUsersTracksOpt(&spotify.Options{
		Offset: &offeset,
		Limit:  &num,
	})
	if err != nil {
		return track, err
	}
	return tracks.Tracks, nil
}
