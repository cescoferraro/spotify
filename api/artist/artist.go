package artist

import (
	"fmt"
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/cescoferraro/spotify/api/types"
	"github.com/justinas/alice"
	"github.com/pkg/errors"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
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
			err = client.AddTracksToLibrary(tracklist...)
			if err != nil {
				return Artist, errors.Wrap(err, "retrieveToken")
			}
		} else {
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
	OauthToken, err := tools.ProcessToken(token, r)
	if err != nil {
		return OAUTH, errors.Wrap(err, "retrieveToken")
	}
	return tools.Auth(r).NewClient(OauthToken), nil
}

// ArtistTrack TODO: NEEDS COMMENT INFO
func ArtistTrack(client spotify.Client, uri string) ([][]spotify.ID, error) {
	var IDS []spotify.ID
	albumObject, err := client.GetArtistAlbums(spotify.ID(uri))
	if err != nil {
		fmt.Printf("%s\n", err.Error())
		return tools.Split(IDS, 50), errors.Wrap(err, "Follow")
	}
	for _, albums := range albumObject.Albums {
		trackPage, err := client.GetAlbumTracks(albums.ID)
		if err != nil {
			fmt.Printf("%s\n", err.Error())
			return tools.Split(IDS, 50), errors.Wrap(err, "Follow")
		}
		for _, id := range trackPage.Tracks {
			IDS = append(IDS, id.ID)
		}
	}
	return tools.Split(IDS, 50), nil
}

var anittaEndPoint = alice.
	New(tools.RequestBodyMiddleware).
	Append(tools.SpotifyClientMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		var move bool
		moveR := chi.URLParam(r, "move")
		switch moveR {
		case "love":
			move = true
		case "hate":
			move = true
		default:
			http.Error(w, "either love or hate", 400)
			return
		}
		body := r.Context().Value(tools.BodyKey).(types.PlayerRequest)
		profile, err := ShowFeelings(move, chi.URLParam(r, "id"), body.Token, r)
		if err != nil {
			http.Error(w, err.Error(), 400)
			return
		}
		render.JSON(w, r, profile)
	}).(http.HandlerFunc)
