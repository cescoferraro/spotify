package ispotify

import (
	"fmt"
	"log"
	"net/http"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// ShowFeelings TODO: NEEDS COMMENT INFO
func ShowFeelings(move bool, id string, token string, r *http.Request) (*spotify.FullArtist, error) {
	var Artist *spotify.FullArtist
	client, err := Authss(token, r)
	if err != nil {
		return Artist, errors.Wrap(err, "retrieveToken")
	}
	IDS, err := ArtistTrack(client, id)
	if err != nil {
		return Artist, errors.Wrap(err, "retrieveToken")
	}
	for _, tracklist := range IDS {
		if move {
			log.Println("+")
			log.Println((len(tracklist)))
			err = client.AddTracksToLibrary(tracklist...)
			if err != nil {
				return Artist, errors.Wrap(err, "retrieveToken")
			}
		} else {
			log.Println("-")
			log.Println((len(tracklist)))
			err = client.RemoveTracksFromLibrary(tracklist...)
			if err != nil {
				return Artist, errors.Wrap(err, "retrieveToken")
			}
		}
	}

	if move {
		err = client.FollowArtist(spotify.ID(id))
		if err != nil {
			return Artist, errors.Wrap(err, "play error")
		}
	} else {
		err = client.UnfollowArtist(spotify.ID(id))
		if err != nil {
			return Artist, errors.Wrap(err, "play error")
		}
	}
	Artist, err = client.GetArtist(spotify.ID(id))
	if err != nil {
		return Artist, errors.Wrap(err, "retrieveToken")
	}
	return Artist, nil
}

// Authss TODO: NEEDS COMMENT INFO
func Authss(token string, r *http.Request) (spotify.Client, error) {
	var OAUTH spotify.Client
	OauthToken, err := ProcessToken(token)
	if err != nil {
		return OAUTH, errors.Wrap(err, "retrieveToken")
	}
	return Auth().NewClient(OauthToken), nil
}

// ArtistTrack TODO: NEEDS COMMENT INFO
func ArtistTrack(client spotify.Client, uri string) ([][]spotify.ID, error) {
	var IDS []spotify.ID
	albumObject, err := client.GetArtistAlbums(spotify.ID(uri))
	if err != nil {
		fmt.Printf("%s\n", err.Error())
		return split(IDS, 50), errors.Wrap(err, "Follow")
	}
	for _, albums := range albumObject.Albums {
		trackPage, err := client.GetAlbumTracks(albums.ID)
		if err != nil {
			fmt.Printf("%s\n", err.Error())
			return split(IDS, 50), errors.Wrap(err, "Follow")
		}
		// 	for _, track := range trackPage.Tracks {
		// 		Tracks = append(Tracks, track)
		// 	}
		// fmt.Println(Tracks)
		for _, id := range trackPage.Tracks {
			IDS = append(IDS, id.ID)
		}
	}
	return split(IDS, 50), nil
}
func split(buf []spotify.ID, lim int) [][]spotify.ID {
	var chunk []spotify.ID
	chunks := make([][]spotify.ID, 0, len(buf)/lim+1)
	for len(buf) >= lim {
		chunk, buf = buf[:lim], buf[lim:]
		chunks = append(chunks, chunk)
	}
	if len(buf) > 0 {
		chunks = append(chunks, buf[:len(buf)])
	}
	return chunks
}
