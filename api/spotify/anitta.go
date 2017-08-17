package spotify

import (
	"fmt"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// Anitta TODO: NEEDS COMMENT INFO
func Anitta(id string, token string) error {
	client, err := Authss(token)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	IDS, err := ArtistTrack(client, "7FNnA9vBm6EKceENgCGRMb")
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	return client.AddTracksToLibrary(IDS...)
}

// UnAnitta TODO: NEEDS COMMENT INFO
func UnAnitta(id string, token string) error {
	client, err := Authss(token)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	IDS, err := ArtistTrack(client, "7FNnA9vBm6EKceENgCGRMb")
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	return client.RemoveTracksFromLibrary(IDS...)
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
