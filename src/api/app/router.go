package app

import (
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
	"net/http"
	"log"

	"github.com/zmb3/spotify"
	"github.com/pressly/chi/middleware"
	"bytes"
)

func Router(version string) (chi.Router) {
	if version == "" {
		version = "NOT SET"
	}
	r := chi.NewRouter()
	r.Use(middleware.Logger)

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
		url := SPOTIFYAUTH.AuthURL(State)
		http.Redirect(w, r, url, http.StatusPermanentRedirect)
	})
	r.Get("/status", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, Tokens.Token)
	})
	r.Get("/version", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, version)
	})

	r.Get("/me/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		log.Printf("Code is %s\n", code)
		user, err := GetProfile(code)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		following, err := Getfollowing(code)
		if err != nil {
			log.Println("getfollowing ERROR")
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		var artistID []string
		for _, artist := range following.Artists {
			artistID = append(artistID, artist.ID.String())
		}

		playlists, err := GetPLaylists(code)
		if err != nil {
			log.Println("getPLaylists  ERROR")
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var recommendations *spotify.Recommendations
		if len(artistID) > 0 {
			recommendations, err = GetRecommendations(artistID, code)
			if err != nil {
				log.Println("getRecommendations  ERROR")
				log.Println(err.Error())
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
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

		playlists, err := Getfollowing(code)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, playlists)
	})

	r.Get("/follow/:id/:code", func(w http.ResponseWriter, r *http.Request) {
		log.Println("=====follow=====")
		code := chi.URLParam(r, "code")
		id := chi.URLParam(r, "id")
		log.Println("=====id=====")
		log.Println(id)
		err := FollowArtists(code, id)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, "SUCESS")
	})

	r.Get("/unfollow/:id/:code", func(w http.ResponseWriter, r *http.Request) {
		log.Println("=====unfollow=====")
		code := chi.URLParam(r, "code")
		id := chi.URLParam(r, "id")
		log.Println("=====id=====")
		log.Println(id)
		err := UnfollowArtists(code, id)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, "SUCESS")
	})

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("*")
		var buffer bytes.Buffer
		if IsProd() {
			buffer.WriteString("http://spotify.cescoferraro.xyz/dashboard")
		} else {
			buffer.WriteString("http://localhost:3000/dashboard")
		}
		if r.URL.RawQuery != "" {
			go RetrieveToken(r.URL.Query().Get("code"))
			buffer.WriteString("?" + r.URL.RawQuery)
		}
		log.Println("redirenting to " + buffer.String())
		http.Redirect(w, r, buffer.String(), http.StatusTemporaryRedirect)
	})
	return r
}
