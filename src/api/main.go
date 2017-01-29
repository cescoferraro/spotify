package main

import (
	"os"
	"time"
	"sync"
	"log"
	"bytes"
	"net/http"

	"golang.org/x/oauth2"
	"github.com/zmb3/spotify"
	"github.com/pkg/errors"
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
	"github.com/pressly/chi/render"
)

type AuthHub struct {
	sync.Mutex
	Token map[string]*oauth2.Token
}

var (
	Tokens = AuthHub{Token:make(map[string]*oauth2.Token)}
	SPOTIFYAUTH spotify.Authenticator = spotifyAuth()
	state = "abc123"
	VERSION string
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// CORS
	r.Use(func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			if origin := r.Header.Get("Origin"); origin != "" {
				w.Header().Set("Access-Control-Allow-Origin", origin)
				w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
				w.Header().Set("Access-Control-Allow-Headers",
					"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Requested-With")
			}
			// Stop here if its Preflighted OPTIONS request
			if r.Method == "OPTIONS" {
				w.WriteHeader(200)
				return
			}
			h.ServeHTTP(w, r)
		})
	})

	r.Get("/login", func(w http.ResponseWriter, r *http.Request) {
		log.Println("LOGIN")
		url := SPOTIFYAUTH.AuthURL(state)
		http.Redirect(w, r, url, http.StatusPermanentRedirect)
	})
	r.Get("/status", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, Tokens.Token)
	})
	r.Get("/version", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, VERSION)
	})

	r.Get("/me/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		log.Printf("Code is %s\n", code)
		user, err := getProfile(code)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		following, err := getfollowing(code)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		var artistID []string
		for _, artist := range following.Artists {
			artistID = append(artistID, artist.ID.String())
		}

		recommendations, err := getRecommendations(artistID, code)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		playlists, err := getPLaylists(code)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		type sdf struct {
			Following       *spotify.FullArtistCursorPage;
			Playlist        []spotify.SimplePlaylist;
			Recommendations *spotify.Recommendations;
			User            *spotify.PrivateUser;
		}
		resp := sdf{Following:following, Recommendations:recommendations, Playlist:playlists, User:user }
		render.JSON(w, r, resp)
	})

	r.Get("/following/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")

		playlists, err := getfollowing(code)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, playlists)
	})

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("*")
		var buffer bytes.Buffer
		if isProd() {
			buffer.WriteString("http://spotify.cescoferraro.xyz/dashboard")
		} else {
			buffer.WriteString("http://localhost:3000/dashboard")
		}
		if r.URL.RawQuery != "" {
			go retrieveToken(r.URL.Query().Get("code"))
			buffer.WriteString("?" + r.URL.RawQuery)
		}
		log.Println("redirenting to " + buffer.String())
		http.Redirect(w, r, buffer.String(), http.StatusTemporaryRedirect)
	})

	log.Printf("Starting Spotify API Tester version %s ...", VERSION)

	log.Fatal(http.ListenAndServe(":8080", r))

}
func isProd() bool {
	prod := os.Getenv("KUBERNETES");
	if prod == "true" {
		return true
	}
	return false
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

func getfollowing(code string) (*spotify.FullArtistCursorPage, error) {
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

func spotifyAuth() spotify.Authenticator {
	var redirectURI string
	if isProd() {
		redirectURI = "http://api.spotify.cescoferraro.xyz"
	} else {
		redirectURI = "http://localhost:8080"
	}
	auth := spotify.NewAuthenticator(redirectURI, spotify.ScopePlaylistModifyPrivate, spotify.ScopePlaylistModifyPublic, spotify.ScopeUserReadPrivate, spotify.ScopeUserFollowModify, spotify.ScopeUserReadEmail, spotify.ScopeUserFollowRead)
	auth.SetAuthInfo("445f705eea2d4d0e8bbd97b796fb7957", "412fb5cbfec2464cb71b567efd0236ea")
	return auth
}

func retrieveToken(code string) (*oauth2.Token, error) {
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

func getProfile(code string) (*spotify.PrivateUser, error) {
	var user *spotify.PrivateUser
	var err error
	token, err := retrieveToken(code)
	if err != nil {
		errors.Wrap(err, "retrieveToken")
		return user, err
	}
	client := SPOTIFYAUTH.NewClient(token)
	return client.CurrentUser()
}
