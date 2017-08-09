package app

import (
	"bytes"
	"log"
	"net/http"

	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
	"github.com/pressly/chi/render"
)

// Router TODO: NEEDS COMMENT INFO
func Router(version string) chi.Router {
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
		log.Println("cnjkfas")
		render.JSON(w, r, Tokens.Token)
	})
	r.Post("/top5", func(w http.ResponseWriter, r *http.Request) {
		buf := bytes.NewBuffer(make([]byte, 0, r.ContentLength))
		_, _ = buf.ReadFrom(r.Body)
		body := buf.Bytes()
		user, err := Getfollowing(string(body))
		if err != nil {
			log.Println(err.Error())
		}
		render.JSON(w, r, user)
	})
	r.Post("/me", func(w http.ResponseWriter, r *http.Request) {
		buf := bytes.NewBuffer(make([]byte, 0, r.ContentLength))
		_, _ = buf.ReadFrom(r.Body)
		body := buf.Bytes()
		user, err := GetProfile(string(body))
		if err != nil {
			log.Println(err.Error())
		}
		render.JSON(w, r, user)
	})

	r.Get("/logout/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		Tokens.Lock()
		defer Tokens.Unlock()
		if Tokens.Token[code] != nil {
			delete(Tokens.Token, code)
			render.JSON(w, r, true)
		}
		render.JSON(w, r, false)

	})
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("*")
		var buffer bytes.Buffer
		if IsProd() {
			buffer.WriteString("http://spotify.cescoferraro.xyz/auth/")
		} else {
			buffer.WriteString("http://localhost:5000/auth/")
		}
		code := r.URL.Query().Get("code")
		if r.URL.RawQuery != "" {
			go RetrieveToken(code)
			buffer.WriteString(code)
		}
		log.Println(r.URL.Query().Get("code"))
		log.Println("redirenting to " + buffer.String())
		http.Redirect(w, r, buffer.String(), http.StatusTemporaryRedirect)
	})
	return r
}
