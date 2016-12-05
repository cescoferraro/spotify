package main

import (
	"net/http"
	"github.com/zmb3/spotify"
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
	"log"
	"html/template"
	"github.com/pressly/chi/render"
)

var (
	TEMPLATES *template.Template
	SPOTIFYAUTH spotify.Authenticator = spotifyAuth()
	state = "abc123"
	VERSION string
)

func init() {
	CompileTempleteIf(isProd())
}

func runTemplates() {
	var err error
	TEMPLATES, err = template.ParseGlob("templates/*")
	if err != nil {
		log.Fatal(err.Error())
	}
}

func CompileTempleteIf(condition bool) {
	if condition {
		runTemplates()
	}
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/follow", func(w http.ResponseWriter, r *http.Request) {
		url := SPOTIFYAUTH.AuthURL(state)
		http.Redirect(w, r, url, http.StatusPermanentRedirect)
	})
	r.Get("/status", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, Tokens.Token)
	})
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		CompileTempleteIf(!isProd())
		code := r.URL.Query().Get("code")
		if code != "" {
			go func() {
				_, err := retrieveToken(code)
				if err != nil {
					log.Println(err.Error())
				}
				return
			}()
		}
		err := TEMPLATES.ExecuteTemplate(w, "base.html", struct {
			AuthURL string
			Code    string
			VERSION string
		}{
			AuthURL:SPOTIFYAUTH.AuthURL(state),
			Code: code,
			VERSION: VERSION,
		})

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

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
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, user)
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
			log.Println(err.Error())
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
			log.Println(err.Error())
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
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, trap)
	})

	log.Fatal(http.ListenAndServe(":8080", r))

}





