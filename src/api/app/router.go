package app

import (
	"github.com/pressly/chi"
	"github.com/pressly/chi/render"
	"net/http"
	"log"
	"github.com/gorilla/websocket"
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

	r.Get("/top5/:label/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		label := chi.URLParam(r, "label")
		err := FollowLabel(code, label)
		if err != nil {
			render.JSON(w, r, false)
			return
		}
		render.JSON(w, r, true)
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

	r.Get("/me/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		resp, err := Me(code)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
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
		code := chi.URLParam(r, "code")
		id := chi.URLParam(r, "id")
		err := FollowArtists(code, id)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, "SUCESS")
	})

	r.Get("/unfollow/:id/:code", func(w http.ResponseWriter, r *http.Request) {
		code := chi.URLParam(r, "code")
		id := chi.URLParam(r, "id")
		err := UnfollowArtists(code, id)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		render.JSON(w, r, "SUCESS")
	})

	r.Get("/ws", func(w http.ResponseWriter, r *http.Request) {
		upgrader := websocket.Upgrader{}
		c, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Print("upgrade:", err)
			return
		}

		defer c.Close()
		for {
			mt, message, err := c.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				break
			}
			log.Printf("recv: %s", message)
			err = c.WriteMessage(mt, message)
			if err != nil {
				log.Println("write:", err)
				break
			}
		}
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




