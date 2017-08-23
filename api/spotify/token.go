package spotify

import (
	"log"
	"sync"
	"time"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

// AuthHub TODO: NEEDS COMMENT INFO
type AuthHub struct {
	sync.Mutex
	Tokens map[string]*oauth2.Token
}

// TokenHUB TODO: NEEDS COMMENT INFO
var (
	TokenHUB = AuthHub{Tokens: make(map[string]*oauth2.Token)}
	State    = "dashboard"
	Auth     = SPOTIFYAUTH()
	Scopes   = []string{
		spotify.ScopePlaylistModifyPrivate,
		spotify.ScopePlaylistModifyPublic,
		spotify.ScopeUserReadPrivate,
		spotify.ScopeUserFollowModify,
		spotify.ScopeUserReadEmail,
		spotify.ScopeUserFollowRead,
		spotify.ScopeUserModifyPlaybackState,
		spotify.ScopeUserReadPlaybackState,
		spotify.ScopeUserLibraryModify,
	}
)

func SPOTIFYAUTH() spotify.Authenticator {
	redirectURI := "https://spotifyapi.cescoferraro.xyz/auth"
	if !tools.IsProd() {
		redirectURI = "http://localhost:8080/auth"
	}
	ClientID := "445f705eea2d4d0e8bbd97b796fb7957"
	secretKey := "412fb5cbfec2464cb71b567efd0236ea"
	auth := spotify.NewAuthenticator(redirectURI, Scopes...)
	auth.SetAuthInfo(ClientID, secretKey)
	return auth
}

// ProcessToken TODO: NEEDS COMMENT INFO
func ProcessToken(code string) (*oauth2.Token, error) {
	log.Println("before LOck")
	TokenHUB.Lock()
	defer TokenHUB.Unlock()
	log.Println("cheking existence")
	if TokenHUB.Tokens[code] != nil {
		log.Println("token found")
		return TokenHUB.Tokens[code], nil
	}
	var err error
	log.Println("exchanging")
	TokenHUB.Tokens[code], err = Auth.Exchange(code)
	if err != nil {
		delete(TokenHUB.Tokens, code)
		return nil, err
	}
	log.Println("gouroutine delete")
	go deleteToken(code, TokenHUB.Tokens)
	return TokenHUB.Tokens[code], err
}

func deleteToken(code string, tokens map[string]*oauth2.Token) {
	time.Sleep(10 * time.Minute)
	delete(tokens, code)
}
