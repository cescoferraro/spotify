package artist

import (
	"fmt"
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/justinas/alice"
	"github.com/pkg/errors"
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

var anittaEndPoint = alice.
	New(tools.GetMoveFromRequest).
	Append(tools.RequestBodyMiddleware).
	Append(tools.SpotifyClientMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		move := r.Context().Value(tools.MoveKey).(bool)
		client := r.Context().Value(tools.ClientKey).(spotify.Client)
		profile, err := ShowFeelings(client, move, id)
		if err != nil {
			http.Error(w, err.Error(), 400)
			return
		}
		render.JSON(w, r, profile)
	}).(http.HandlerFunc)

// ShowFeelings TODO: NEEDS COMMENT INFO
func ShowFeelings(client spotify.Client, move bool, id string) (*spotify.FullArtist, error) {
	var Artist *spotify.FullArtist
	IDS, err := ArtistTrack(client, id)
	if err != nil {
		return Artist, errors.Wrap(err, "ArtistTrack")
	}
	for _, tracklist := range IDS {
		if move {
			err = client.AddTracksToLibrary(tracklist...)
			if err != nil {
				return Artist, errors.Wrap(err, "AddTracksToLibrary")
			}
		} else {
			err = client.RemoveTracksFromLibrary(tracklist...)
			if err != nil {
				return Artist, errors.Wrap(err, "RemoveTracksFromLibrary")
			}
		}
	}
	if move {
		err = client.FollowArtist(spotify.ID(id))
		if err != nil {
			return Artist, errors.Wrap(err, "FollowArtist")
		}
	} else {
		err = client.UnfollowArtist(spotify.ID(id))
		if err != nil {
			return Artist, errors.Wrap(err, "UnfollowArtist")
		}
	}
	Artist, err = client.GetArtist(spotify.ID(id))
	if err != nil {
		return Artist, errors.Wrap(err, "GetArtist")
	}
	return Artist, nil
}

// ArtistTrack TODO: NEEDS COMMENT INFO
func ArtistTrack(client spotify.Client, uri string) ([][]spotify.ID, error) {
	var IDS []spotify.ID
	albumObject, err := client.GetArtistAlbums(spotify.ID(uri))
	if err != nil {
		fmt.Printf("%s\n", err.Error())
		return tools.Split(IDS, 50), errors.Wrap(err, "GetArtistAlbums")
	}
	for _, albums := range albumObject.Albums {
		trackPage, err := client.GetAlbumTracks(albums.ID)
		if err != nil {
			fmt.Printf("%s\n", err.Error())
			return tools.Split(IDS, 50), errors.Wrap(err, "GetAlbumTracks")
		}
		for _, id := range trackPage.Tracks {
			IDS = append(IDS, id.ID)
		}
	}
	return tools.Split(IDS, 50), nil
}
