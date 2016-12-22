package main

import (
	"github.com/zmb3/spotify"
	"os"
	"github.com/pkg/errors"
	"golang.org/x/oauth2"
	"time"
	"sync"
	"net/http"
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
	"github.com/pressly/chi/render"
	"path/filepath"
	"log"
	"io/ioutil"
	"encoding/json"
	"bytes"
	"flag"
)

type ToK struct {
	sync.Mutex
	Token map[string]*oauth2.Token
}

var (
	Tokens = ToK{Token:make(map[string]*oauth2.Token)}
	SPOTIFYAUTH spotify.Authenticator = spotifyAuth()
	state = "abc123"
	VERSION string
)

func main() {
	var direct bool
	flag.BoolVar(&direct, "direct", false, "a bool")
	flag.Parse()
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/login", func(w http.ResponseWriter, r *http.Request) {
		url := SPOTIFYAUTH.AuthURL(state)
		http.Redirect(w, r, url, http.StatusPermanentRedirect)
	})
	r.Get("/status", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, Tokens.Token)
	})
	r.Get("/version", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, VERSION)
	})

	r.Get("/follow/:id/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		id := chi.URLParam(r, "id")
		err := followArtists(code, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, "SUCESS")
	})

	r.Get("/unfollow/:id/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		id := chi.URLParam(r, "id")
		err := unfollowArtists(code, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, "SUCESS")
	})
	r.Get("/me/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		user, err := getProfile(code)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, user)
	})
	r.Post("/recommendations/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")

		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var artists []string
		err = json.Unmarshal(body, &artists)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		log.Println(artists)
		indications, err := getRecommendations(artists, code)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, indications)
	})

	r.Get("/following/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")

		playlists, err := getArtists(code)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, playlists)
	})

	r.Get("/playlist/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		playlists, err := getPLaylists(code)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, playlists)
	})
	r.Get("/playlist/remove/:id/:playlist/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		id := chi.URLParam(r, "id")
		playlist := chi.URLParam(r, "playlist")
		err := removePlaylist(id, playlist, code)
		if err != nil {
			//log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, true)
	})
	r.Get("/playlist/add/:id/:playlist/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		id := chi.URLParam(r, "id")
		playlist := chi.URLParam(r, "playlist")
		err := addPlaylist(id, playlist, code)
		if err != nil {
			//log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, true)
	})
	r.Get("/tracks/:id/:playlist/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		id := chi.URLParam(r, "id")
		playlist := chi.URLParam(r, "playlist")
		playlists, err := getPLaylistsTracks(id, playlist, code)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, playlists)
	})

	r.Get("/tracks/add/:id/:playlist/:track/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		id := chi.URLParam(r, "id")
		playlist := chi.URLParam(r, "playlist")
		track := chi.URLParam(r, "track")
		trap, err := addTrackToPlaylist(id, playlist, track, code)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, trap)
	})
	if isProd() || direct {
		log.Println("direct or production")

		workDir, _ := os.Getwd()
		filesDir := filepath.Join(workDir, "www")
		r.FileServer("/", http.Dir(filesDir))
	} else {

		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			var buffer bytes.Buffer
			buffer.WriteString("http://localhost:8000")
			if r.URL.RawQuery != "" {
				buffer.WriteString("?" + r.URL.RawQuery)
			}
			log.Println("redirenting to " + buffer.String())
			http.Redirect(w, r, buffer.String(), http.StatusTemporaryRedirect)
		})
	}

	log.Println("Starting Spotify API Tester ...")
	log.Fatal(http.ListenAndServe(":8080", r))

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
func isDocker() bool {
	prod := os.Getenv("DOCKER");
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
	cc := func() {
		time.Sleep(100 * time.Millisecond)
		Tokens.Unlock()
	}
	defer cc()
	if Tokens.Token[code] != nil {
		return Tokens.Token[code], nil
	}
	var err error
	Tokens.Token[code], err = SPOTIFYAUTH.Exchange(code)
	go func() {
		time.Sleep(10 * time.Minute)
		delete(Tokens.Token, code)
	}()
	return Tokens.Token[code], err
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

func getRecommendations(artists []string, code string) (*spotify.Recommendations, error) {
	recommendations := new(spotify.Recommendations)
	var err error
	token, err := retrieveToken(code)
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
	var playlists = new(spotify.SimplePlaylistPage)
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

func addPlaylist(id, playlist, code string) (error) {
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return err
	}
	client := SPOTIFYAUTH.NewClient(token)
	err = client.FollowPlaylist(spotify.ID(id), spotify.ID(playlist), true)
	if err != nil {
		errors.Wrap(err, "client.CurrentUser")
		return err
	}
	return nil
}

func removePlaylist(id, playlist, code string) (error) {
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return err
	}
	client := SPOTIFYAUTH.NewClient(token)
	err = client.UnfollowPlaylist(spotify.ID(id), spotify.ID(playlist))
	if err != nil {
		errors.Wrap(err, "client.CurrentUser")
		return err
	}
	return nil
}


