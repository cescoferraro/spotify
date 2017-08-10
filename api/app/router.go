package app

import (
	"bytes"
	"encoding/json"
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
	r.Use(Cors)

	r.Post("/play", func(w http.ResponseWriter, r *http.Request) {
		token, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = Play(token)
		if err != nil {
			log.Println(err.Error())
			return
		}

		log.Println(token)
		render.JSON(w, r, true)
	})
	r.Post("/repeat/{state}", func(w http.ResponseWriter, r *http.Request) {
		state:= chi.URLParam(r, "state")
		token, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = Repeat(state, token)
		if err != nil {
			log.Println(err.Error())
			return
		}

		log.Println(token)
		render.JSON(w, r, state)
	})
	r.Post("/play/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		log.Println(id)
		token, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = PlayOpts(id, token)
		if err != nil {
			log.Println(err.Error())
			return
		}

		log.Println(token)
		render.JSON(w, r, id)
	})
	r.Get("/login", func(w http.ResponseWriter, r *http.Request) {
		log.Println("LOGIN")
		url := SPOTIFYAUTH.AuthURL(State)
		http.Redirect(w, r, url, http.StatusPermanentRedirect)
	})
	r.Get("/status", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, Tokens.Token)
	})

	r.Post("/playlists", func(w http.ResponseWriter, r *http.Request) {
		body, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		user, err := GetPLaylists(body)
		if err != nil {
			log.Println(err.Error())
			return
		}
		render.JSON(w, r, user)
	})
	r.Post("/pause", func(w http.ResponseWriter, r *http.Request) {
		body, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = Pause(body)
		if err != nil {
			log.Println(err.Error())
		}
		render.JSON(w, r, "next")
	})
	r.Post("/previous", func(w http.ResponseWriter, r *http.Request) {
		body, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = Previous(body)
		if err != nil {
			log.Println(err.Error())
		}
		render.JSON(w, r, "next")
	})
	r.Post("/next", func(w http.ResponseWriter, r *http.Request) {
		body, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = Next(body)
		if err != nil {
			log.Println(err.Error())
		}
		render.JSON(w, r, "next")
	})
	r.Post("/following", func(w http.ResponseWriter, r *http.Request) {
		body, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		user, err := Getfollowing(body)
		if err != nil {
			log.Println(err.Error())
		}
		render.JSON(w, r, user)
	})
	r.Post("/me", func(w http.ResponseWriter, r *http.Request) {

		body, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		user, err := GetProfile(body)
		if err != nil {
			log.Println(err.Error())
		}
		render.JSON(w, r, user)
	})

	r.Get("/logout", func(w http.ResponseWriter, r *http.Request) {
		code, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
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

// TestStruct TODO: NEEDS COMMENT INFO
type TestStruct struct {
	ID    string `json:"id"`
	Token string `json:"token"`
}

// GetBODY TODO: NEEDS COMMENT INFO
func GetBODYPLAY(r *http.Request) (*TestStruct, error) {
	var t = TestStruct{}
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Println("error")
		return &t, err
	}
	log.Println("error")
	log.Println(t.ID)
	return &t, nil
}

// GetBODY TODO: NEEDS COMMENT INFO
func GetBODY(r *http.Request) (string, error) {
	buf := bytes.NewBuffer(make([]byte, 0, r.ContentLength))
	_, err := buf.ReadFrom(r.Body)
	if err != nil {
		return "", err
	}
	return string(buf.Bytes()), nil
}
