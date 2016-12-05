package main

import (
	"github.com/zmb3/spotify"
	"os"
	"github.com/pkg/errors"
	"golang.org/x/oauth2"
	"time"
	"sync"
	"log"
)

var Tokens = ToK{Token:make(map[string]*oauth2.Token)}

type ToK struct {
	sync.Mutex
	Token map[string]*oauth2.Token
}

func spotifyAuth() spotify.Authenticator {
	var redirectURI string
	if isProd() {
		redirectURI = "http://guime.cescoferraro.xyz"
	} else {
		redirectURI = "http://localhost:8080"
	}
	auth := spotify.NewAuthenticator(redirectURI, spotify.ScopePlaylistModifyPrivate, spotify.ScopePlaylistModifyPublic, spotify.ScopeUserReadPrivate, spotify.ScopeUserFollowModify, spotify.ScopeUserReadEmail, spotify.ScopeUserFollowRead)
	auth.SetAuthInfo("445f705eea2d4d0e8bbd97b796fb7957", "412fb5cbfec2464cb71b567efd0236ea")
	return auth
}

func isProd() bool {
	prod := os.Getenv("KUBERNETES");
	if prod == "true" {
		return true
	}
	return false
}

func followArtists(code string, ids ...string) error {
	var err error
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return err
	}
	client := SPOTIFYAUTH.NewClient(token)
	var spotID []spotify.ID
	for _, artist := range ids {
		spotID = append(spotID, spotify.ID(artist))
	}
	err = client.FollowArtist(spotID...)
	if err != nil {
		errors.Wrap(err, "Follow")
		return err
	}
	return nil
}
func unfollowArtists(code string, ids ...string) error {
	var err error
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return err
	}
	client := SPOTIFYAUTH.NewClient(token)
	var spotID []spotify.ID
	for _, artist := range ids {
		spotID = append(spotID, spotify.ID(artist))
	}
	err = client.UnfollowArtist(spotID...)
	if err != nil {
		errors.Wrap(err, "Follow")
		return err
	}
	return nil
}

func retrieveToken(code string) (*oauth2.Token, error) {
	Tokens.Lock()
	var err error
	if Tokens.Token[code] == nil {

		log.Println("fresh token")
		Tokens.Token[code], err = SPOTIFYAUTH.Exchange(code)

		go func() {
			time.Sleep(5 * time.Minute)
			delete(Tokens.Token, code)
		}()
		if err != nil {
			return Tokens.Token[code], err
		}
	}
	Tokens.Unlock()
	return Tokens.Token[code], nil
}

func getProfile(code string) (*spotify.PrivateUser, error) {
	var user *spotify.PrivateUser
	var err error
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return user, err
	}
	client := SPOTIFYAUTH.NewClient(token)
	user, err = client.CurrentUser()
	if err != nil {
		errors.Wrap(err, "client.CurrentUser")
		return user, err
	}
	return user, nil
}

type ArtistType struct {
	Name      string
	Followers int
	Image     string
}

func getArtists(code string) (*spotify.FullArtistCursorPage, error) {
	var artists *spotify.FullArtistCursorPage
	var err error
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return artists, err
	}
	client := SPOTIFYAUTH.NewClient(token)
	artists, err = client.CurrentUsersFollowedArtists()
	if err != nil {
		errors.Wrap(err, "client.CurrentUser")
		return artists, err
	}

	return artists, nil
}

func getPLaylists(code string) ([]spotify.SimplePlaylist, error) {
	var playlists *spotify.SimplePlaylistPage
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return playlists.Playlists, err
	}
	client := SPOTIFYAUTH.NewClient(token)
	playlists, err = client.CurrentUsersPlaylists()
	if err != nil {
		errors.Wrap(err, "client.CurrentUser")
		return playlists.Playlists, err
	}
	return playlists.Playlists, nil
}

func getPLaylistsTracks(id, playlist, code string) (*spotify.PlaylistTrackPage, error) {
	var PlaylistTrackPage *spotify.PlaylistTrackPage
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return PlaylistTrackPage, err
	}
	client := SPOTIFYAUTH.NewClient(token)
	PlaylistTrackPage, err = client.GetPlaylistTracks(id, spotify.ID(playlist))
	if err != nil {
		errors.Wrap(err, "client.CurrentUser")
		return PlaylistTrackPage, err
	}
	return PlaylistTrackPage, nil
}

func addTrackToPlaylist(id, playlist, track, code string) (string, error) {
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return "", err
	}
	client := SPOTIFYAUTH.NewClient(token)
	snap, err := client.AddTracksToPlaylist(id, spotify.ID(playlist), spotify.ID(track))
	if err != nil {
		errors.Wrap(err, "client.CurrentUser")
		return snap, err
	}
	return snap, nil
}


func addPlaylist(id, playlist, code string) ( error) {
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return  err
	}
	client := SPOTIFYAUTH.NewClient(token)
	err = client.FollowPlaylist(spotify.ID(id), spotify.ID(playlist), true)
	if err != nil {
		errors.Wrap(err, "client.CurrentUser")
		return  err
	}
	return  nil
}


func removePlaylist(id, playlist, code string) ( error) {
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return  err
	}
	client := SPOTIFYAUTH.NewClient(token)
	err = client.UnfollowPlaylist(spotify.ID(id), spotify.ID(playlist))
	if err != nil {
		errors.Wrap(err, "client.CurrentUser")
		return  err
	}
	return  nil
}




