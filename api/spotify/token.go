package spotify

import (
	"log"
	"net/http"
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

func Auth(r *http.Request) spotify.Authenticator {
	redirectURI := "https://spotifyapi.cescoferraro.xyz/auth"
	//if !tools.IsProd() {
	redirectURI = "http://" + r.Host + "/auth"
	//}
	ClientID := "b7c0eb3228774d998db94fe352dfd2d9"
	secretKey := "63fe79e44da74938aec14c23c346ea06"
	auth := spotify.NewAuthenticator(redirectURI, Scopes...)
	auth.SetAuthInfo(ClientID, secretKey)
	return auth
}

// ProcessToken TODO: NEEDS COMMENT INFO
func ProcessToken(code string, r *http.Request) (*oauth2.Token, error) {
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
	TokenHUB.Tokens[code], err = Auth(r).Exchange(code)
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
