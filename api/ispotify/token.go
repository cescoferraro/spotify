package ispotify

import (
	"github.com/cescoferraro/spotify/api/tools"
	"log"
	"sync"
	"time"

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
	Scopes   = []string{
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

func Auth() spotify.Authenticator {
	redirectURI := "http://localhost:8080/auth"
	log.Println("kube kube *********")
	if tools.IsProd() {
		redirectURI = "https://spotifyapi.cescoferraro.xyz/auth"
	}
	ClientID := "29341ec7d73e4383b58db00e354dc89c"
	secretKey := "3ef3543b524a4978ae5f7b14fdc63a6d"
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
	TokenHUB.Tokens[code], err = Auth().Exchange(code)
	if err != nil {
		delete(TokenHUB.Tokens, code)
		return nil, err
	}
	log.Println("gouroutine delete")
	return TokenHUB.Tokens[code], err
}

func deleteToken(code string, tokens map[string]*oauth2.Token) {
	time.Sleep(10 * time.Minute)
	delete(tokens, code)
}
