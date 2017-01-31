package app

import (
	"time"
	"golang.org/x/oauth2"
	"github.com/zmb3/spotify"
	"github.com/pkg/errors"
	"sync"
)

type AuthHub struct {
	sync.Mutex
	Token map[string]*oauth2.Token
}

var (
	Tokens = AuthHub{Token:make(map[string]*oauth2.Token)}
	SPOTIFYAUTH spotify.Authenticator = spotifyAuth()
	State = "abc123"
)

func GetPLaylists(code string) ([]spotify.SimplePlaylist, error) {
	var playlists = new(spotify.SimplePlaylistPage)
	token, err := RetrieveToken(code)
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

func Getfollowing(code string) (*spotify.FullArtistCursorPage, error) {
	var artists *spotify.FullArtistCursorPage
	var err error
	token, err := RetrieveToken(code)
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

func GetRecommendations(artists []string, code string) (*spotify.Recommendations, error) {
	recommendations := new(spotify.Recommendations)
	var err error
	token, err := RetrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return recommendations, err
	}
	client := SPOTIFYAUTH.NewClient(token)
	artistSeed := []spotify.ID{}
	for _, artist := range artists {
		artistSeed = append(artistSeed, spotify.ID(artist))

	}
	seed := spotify.Seeds{
		Artists:artistSeed,
	}

	recommendations, err = client.GetRecommendations(seed, new(spotify.TrackAttributes), new(spotify.Options))
	if err != nil {
		errors.Wrap(err, "GetRecommendations")
		return recommendations, err
	}
	return recommendations, nil
}

func spotifyAuth() spotify.Authenticator {
	var redirectURI string
	if IsProd() {
		redirectURI = "http://api.spotify.cescoferraro.xyz"
	} else {
		redirectURI = "http://localhost:8080"
	}
	auth := spotify.NewAuthenticator(redirectURI, spotify.ScopePlaylistModifyPrivate, spotify.ScopePlaylistModifyPublic, spotify.ScopeUserReadPrivate, spotify.ScopeUserFollowModify, spotify.ScopeUserReadEmail, spotify.ScopeUserFollowRead)
	auth.SetAuthInfo("445f705eea2d4d0e8bbd97b796fb7957", "412fb5cbfec2464cb71b567efd0236ea")
	return auth
}

func RetrieveToken(code string) (*oauth2.Token, error) {
	Tokens.Lock()
	defer Tokens.Unlock()
	if Tokens.Token[code] != nil {
		return Tokens.Token[code], nil
	}
	var err error
	Tokens.Token[code], err = SPOTIFYAUTH.Exchange(code)
	if err != nil {
		delete(Tokens.Token, code)
		return nil, err
	}

	go func() {
		time.Sleep(10 * time.Minute)
		delete(Tokens.Token, code)
	}()
	return Tokens.Token[code], err
}

func GetProfile(code string) (*spotify.PrivateUser, error) {
	var user *spotify.PrivateUser
	var err error
	token, err := RetrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return user, err
	}
	client := SPOTIFYAUTH.NewClient(token)
	return client.CurrentUser()
}

func FollowArtists(code string, ids ...string) error {
	var err error
	token, err := RetrieveToken(code)
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
func UnfollowArtists(code string, ids ...string) error {
	var err error
	token, err := RetrieveToken(code)
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

