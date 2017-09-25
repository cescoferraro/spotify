package youtube

import (
	"context"
	"log"
	"net/http"

	youtube "google.golang.org/api/youtube/v3"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/justinas/alice"
	"github.com/pressly/chi/render"
	"golang.org/x/oauth2"
)

var config = oauth2.Config{
	ClientID:     "281294552767-knh42frq8tlmk3uu60585t029gub036i.apps.googleusercontent.com",
	ClientSecret: "SwYBiW76twMH6ln3Na83R6fC",
	Endpoint: oauth2.Endpoint{
		AuthURL:  "https://accounts.google.com/o/oauth2/auth",
		TokenURL: "https://accounts.google.com/o/oauth2/token",
	},
	RedirectURL: "http://localhost:8080/youtube",
	Scopes:      []string{youtube.YoutubeReadonlyScope},
}

// LOGIN sdkjfnsdf
var LOGIN = alice.New(tools.EmptyMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		authURL := config.AuthCodeURL("youtube-token", oauth2.AccessTypeOffline)
		http.Redirect(w, r, authURL, http.StatusPermanentRedirect)
	}).(http.HandlerFunc)

// CALLBACK sdkjfn
var CALLBACK = alice.New(tools.EmptyMiddleware).
	ThenFunc(func(w http.ResponseWriter, r *http.Request) {
		code := r.URL.Query().Get("code")
		client := config.Client(context.Background(), &oauth2.Token{AccessToken: code})

		// token, err := transport.Exchange(code)
		service, err := youtube.New(client)
		if err != nil {
			http.Error(w, "sdfjk", 400)
		}
		log.Println(service.Subscriptions)
		render.JSON(w, r, service.Subscriptions)
	}).(http.HandlerFunc)
