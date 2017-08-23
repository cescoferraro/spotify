package spotify

import (
	"fmt"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// ShowFeelings TODO: NEEDS COMMENT INFO
func ShowFeelings(move bool, id string, token string) (*spotify.FullArtist, error) {
	var Artist *spotify.FullArtist
	client, err := Authss(token)
	if err != nil {
		return Artist, errors.Wrap(err, "retrieveToken")
	}
	IDS, err := ArtistTrack(client, id)
	if err != nil {
		return Artist, errors.Wrap(err, "retrieveToken")
	}
	if move {
		err = client.AddTracksToLibrary(IDS...)
		if err != nil {
			return Artist, errors.Wrap(err, "retrieveToken")
		}
	} else {
		err = client.RemoveTracksFromLibrary(IDS...)
		if err != nil {
			return Artist, errors.Wrap(err, "retrieveToken")
		}
	}
	Artist, err = client.GetArtist(spotify.ID(id))
	if err != nil {
		return Artist, errors.Wrap(err, "retrieveToken")
	}
	return Artist, nil
}

// Authss TODO: NEEDS COMMENT INFO
func Authss(token string) (spotify.Client, error) {
	var OAUTH spotify.Client
	OauthToken, err := ProcessToken(token)
	if err != nil {
		return OAUTH, errors.Wrap(err, "retrieveToken")
	}
	return Auth.NewClient(OauthToken), nil
}

// ArtistTrack TODO: NEEDS COMMENT INFO
func ArtistTrack(client spotify.Client, uri string) ([]spotify.ID, error) {
	var IDS []spotify.ID
	albumObject, err := client.GetArtistAlbums(spotify.ID(uri))
	if err != nil {
		fmt.Printf("%s\n", err.Error())
		return IDS, errors.Wrap(err, "Follow")
	}
	var Tracks []spotify.SimpleTrack
	for _, albums := range albumObject.Albums {
		trackPage, err := client.GetAlbumTracks(albums.ID)
		if err != nil {
			fmt.Printf("%s\n", err.Error())
			return IDS, errors.Wrap(err, "Follow")
		}
		for _, track := range trackPage.Tracks {
			Tracks = append(Tracks, track)
		}
	}
	fmt.Println(Tracks)
	for _, id := range Tracks {
		IDS = append(IDS, id.ID)
	}
	if len(IDS) > 50 {
		return IDS[:50], nil
	}
	return IDS, nil
}
