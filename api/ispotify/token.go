package ispotify

import (
	"context"
	"errors"
	"github.com/cescoferraro/spotify/api/istructql"
	"github.com/cescoferraro/spotify/api/tools"
	"golang.org/x/oauth2/clientcredentials"
	"log"
	"time"

	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

// TokenHUB TODO: NEEDS COMMENT INFO
var (
	State  = "dashboard"
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
	if tools.IsProd() {
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
	atoken, ok := ctx.Value(tools.Key("access-token")).(string)
	if !ok {
		return &oauth2.Token{}, errors.New("cast error")
	}
	rtoken, ok := ctx.Value(tools.Key("refresh-token")).(string)
	if !ok {
		return &oauth2.Token{}, errors.New("cast error")
	}
	tokenType, ok := ctx.Value(tools.Key("token-type")).(string)
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

var SavedTrack = istructql.GenerateType(spotify.SavedTrack{
	AddedAt: "",
	FullTrack: spotify.FullTrack{
		SimpleTrack: spotify.SimpleTrack{
			Artists:          []spotify.SimpleArtist{{}},
			AvailableMarkets: []string{""},
		},
		Album: spotify.SimpleAlbum{
			AvailableMarkets: []string{""},
			Images:           []spotify.Image{{}},
		},
	},
})
