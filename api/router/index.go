package router
import (
	"bytes"
	"encoding/json"
	"log"
"net/http"
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
	"github.com/pressly/chi/render"
	"github.com/cescoferraro/spotify/api/app"

)

// Router TODO: NEEDS COMMENT INFO
func Nginx(version string) chi.Router {
	if version == "" {
		version = "NOT SET"
	}
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(app.Cors)

	r.Post("/play", func(w http.ResponseWriter, r *http.Request) {
		token, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = app.Play(token)
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
		err = app.Repeat(state, token)
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
		err = app.PlayOpts(id, token)
		if err != nil {
			log.Println(err.Error())
			return
		}

		log.Println(token)
		render.JSON(w, r, id)
	})
	r.Get("/login", func(w http.ResponseWriter, r *http.Request) {
		log.Println("LOGIN")
		url := app.SPOTIFYAUTH.AuthURL(app.State)
		http.Redirect(w, r, url, http.StatusPermanentRedirect)
	})
	r.Get("/status", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, app.Tokens.Token)
	})

	r.Post("/playlists", func(w http.ResponseWriter, r *http.Request) {
		body, err := GetBODY(r)
		if err != nil {
			log.Println(err.Error())
			return
		}
		user, err := app.GetPLaylists(body)
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
		err = app.Pause(body)
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
		err = app.Previous(body)
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
		err = app.Next(body)
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
		user, err := app.Getfollowing(body)
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
		user, err := app.GetProfile(body)
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
		app.Tokens.Lock()
		defer app.Tokens.Unlock()
		if app.Tokens.Token[code] != nil {
			delete(app.Tokens.Token, code)
			render.JSON(w, r, true)
		}
		render.JSON(w, r, false)

	})
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("*")
		var buffer bytes.Buffer
		if app.IsProd() {
			buffer.WriteString("http://spotify.cescoferraro.xyz/auth/")
		} else {
			buffer.WriteString("http://localhost:5000/auth/")
		}
		code := r.URL.Query().Get("code")
		if r.URL.RawQuery != "" {
			go app.RetrieveToken(code)
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
