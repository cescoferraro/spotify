package tools

import (
	"context"
	"errors"
	"github.com/graphql-go/handler"
	"golang.org/x/oauth2/clientcredentials"
	"log"
	"net/http"
	"time"

	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

// TokenHUB constanta information
var (
	Scopes = []string{
		spotify.ScopeImageUpload,
		spotify.ScopePlaylistReadPrivate,
		spotify.ScopePlaylistModifyPublic,
		spotify.ScopePlaylistModifyPrivate,
		spotify.ScopePlaylistReadCollaborative,
		spotify.ScopeUserFollowModify,
		spotify.ScopeUserFollowRead,
		spotify.ScopeUserLibraryModify,
		spotify.ScopeUserLibraryRead,
		spotify.ScopeUserReadPrivate,
		spotify.ScopeUserReadEmail,
		//spotify.ScopeUserReadBirthdate,
		spotify.ScopeUserReadCurrentlyPlaying,
		spotify.ScopeUserReadPlaybackState,
		spotify.ScopeUserModifyPlaybackState,
		spotify.ScopeUserReadRecentlyPlayed,
	}
)

var ClientID = "29341ec7d73e4383b58db00e354dc89c"
var secretKey = "3ef3543b524a4978ae5f7b14fdc63a6d"

func Auth() spotify.Authenticator {
	redirectURI := "http://localhost:8080/auth"
	log.Println("kube kube *********")
	if IsProd() {
		redirectURI = "https://spotifyapi.cescoferraro.xyz/auth"
	}

	auth := spotify.NewAuthenticator(redirectURI, Scopes...)
	auth.SetAuthInfo(ClientID, secretKey)
	return auth
}

func SpotifyPublicClient() (spotify.Client, error) {
	auth := Auth()
	config := &clientcredentials.Config{
		ClientID:     ClientID,
		ClientSecret: secretKey,
		Scopes:       Scopes,
		TokenURL:     spotify.TokenURL,
	}
	token, err := config.Token(context.Background())
	if err != nil {
		log.Fatalf("couldn't get token: %v", err)
	}
	return auth.NewClient(token), nil
}
func SpotifyClientFromContext(ctx context.Context) (spotify.Client, error) {
	token, err := getOAuthTokenFromContext(ctx)
	if err != nil {
		return spotify.Client{}, err
	}
	return Auth().NewClient(token), nil
}

func getOAuthTokenFromContext(ctx context.Context) (*oauth2.Token, error) {
	atoken, ok := ctx.Value(Key("access-token")).(string)
	if !ok {
		return &oauth2.Token{}, errors.New("cast error")
	}
	rtoken, ok := ctx.Value(Key("refresh-token")).(string)
	if !ok {
		return &oauth2.Token{}, errors.New("cast error")
	}
	tokenType, ok := ctx.Value(Key("token-type")).(string)
	if !ok {
		return &oauth2.Token{}, errors.New("cast error")
	}
	token := new(oauth2.Token)
	token.AccessToken = atoken
	token.RefreshToken = rtoken
	token.Expiry = time.Now()
	token.TokenType = tokenType
	return token, nil
}

func HttpHeaderMiddleware(next *handler.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), Key("code"), r.Header.Get("Code"))
		ctx = context.WithValue(ctx, Key("refresh-token"), r.Header.Get("Refresh-Token"))
		ctx = context.WithValue(ctx, Key("access-token"), r.Header.Get("Access-Token"))
		ctx = context.WithValue(ctx, Key("expiry"), r.Header.Get("Expiry"))
		ctx = context.WithValue(ctx, Key("state"), r.Header.Get("State"))
		ctx = context.WithValue(ctx, Key("token-type"), r.Header.Get("Token-Type"))
		next.ContextHandler(ctx, w, r)
	})
}
