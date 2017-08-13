package spotify 

import (
	"log"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)



// Next TODO: NEEDS COMMENT INFO
func Pause(code string) error {
	token, err := GETToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	err = client.Pause()
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}

// Next Previous: NEEDS COMMENT INFO
func Previous(code string) error {
	token, err := GETToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	err = client.Previous()
	if err != nil {
	 errors.Wrap(err, "next error")
	}
	return nil
}

// Play TODO: NEEDS COMMENT INFO
func Play(code string) error {
	token, err := GETToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	err = client.Play()
	if err != nil {
		return errors.Wrap(err, "play error")
	}
	return nil
}
// Repeat TODO: NEEDS COMMENT INFO
func Repeat(state string, code string) error {
	token, err := GETToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	log.Println(" 7777")
	err = client.Repeat(state)
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}

// PlayOpts TODO: NEEDS COMMENT INFO
func PlayOpts(id string, code string) error {
	token, err := GETToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	err = client.PlayOpt(&spotify.PlayOptions{
		URIs: []spotify.URI{spotify.URI(id)},
	})

	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}

// Next TODO: NEEDS COMMENT INFO
func Next(code string) error {
	token, err := GETToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	err = client.Next()
	if err != nil {
		return errors.Wrap(err, "next error")
	}
	return nil
}

// GetPLaylists TODO: NEEDS COMMENT INFO
func GetPLaylists(code string) ([]spotify.SimplePlaylist, error) {
	var playlists = new(spotify.SimplePlaylistPage)
	token, err := GETToken(code)
	if err != nil {
		return playlists.Playlists, errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	playlists, err = client.CurrentUsersPlaylists()
	if err != nil {
		return playlists.Playlists, errors.Wrap(err, "client.CurrentUser")
	}
	return playlists.Playlists, nil
}

// Getfollowing TODO: NEEDS COMMENT INFO
func Getfollowing(code string) (*spotify.FullArtistCursorPage, error) {
	var artists *spotify.FullArtistCursorPage
	var err error
	token, err := GETToken(code)
	if err != nil {
		return artists, errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	artists, err = client.CurrentUsersFollowedArtists()
	if err != nil {
		return artists, errors.Wrap(err, "client.CurrentUser")
	}
	return artists, nil
}

// GetRecommendations TODO: NEEDS COMMENT INFO
func GetRecommendations(artists []string, code string) (*spotify.Recommendations, error) {
	recommendations := new(spotify.Recommendations)
	var err error
	token, err := GETToken(code)
	if err != nil {
		return recommendations, errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	artistSeed := []spotify.ID{}
	for _, artist := range artists {
		artistSeed = append(artistSeed, spotify.ID(artist))

	}
	seed := spotify.Seeds{
		Artists: artistSeed,
	}

	recommendations, err = client.GetRecommendations(seed, new(spotify.TrackAttributes), new(spotify.Options))
	if err != nil {

		return recommendations, errors.Wrap(err, "GetRecommendations")
	}
	return recommendations, nil
}
// GetProfile TODO: NEEDS COMMENT INFO
func GetProfile(code string) (*spotify.PrivateUser, error) {
	var user *spotify.PrivateUser
	var err error
	log.Println("before retrieving code")
	token, err := GETToken(code)
	if err != nil {
		return user, errors.Wrap(err, "retrieveToken")
	}
	log.Println("after retrieving code")
	client := SPOTIFYAUTH.NewClient(token)
	return client.CurrentUser()
}

// FollowArtists TODO: NEEDS COMMENT INFO
func FollowArtists(code string, ids ...string) error {
	var err error
	token, err := GETToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	var spotID []spotify.ID
	for _, artist := range ids {
		spotID = append(spotID, spotify.ID(artist))
	}
	err = client.FollowArtist(spotID...)
	if err != nil {
		return errors.Wrap(err, "Follow")
	}
	return nil
}

// UnfollowArtists TODO: NEEDS COMMENT INFO
func UnfollowArtists(code string, ids ...string) error {
	var err error
	token, err := GETToken(code)
	if err != nil {
		return errors.Wrap(err, "retrieveToken")
	}
	client := SPOTIFYAUTH.NewClient(token)
	var spotID []spotify.ID
	for _, artist := range ids {
		spotID = append(spotID, spotify.ID(artist))
	}
	err = client.UnfollowArtist(spotID...)
	if err != nil {
		return errors.Wrap(err, "Follow")
	}
	return nil
}
