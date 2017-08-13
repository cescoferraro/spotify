package router

import (
	"bytes"
	"log"
	"net/http"

	"github.com/cescoferraro/spotify/api/spotify"
	"github.com/cescoferraro/spotify/api/tools"
)

func rootEndPoint(w http.ResponseWriter, r *http.Request) {
	log.Println("*")
	var buffer bytes.Buffer
	if tools.IsProd() {
		buffer.WriteString("http://spotify.cescoferraro.xyz/auth/")
	} else {
		buffer.WriteString("http://localhost:5000/auth/")
	}
	code := r.URL.Query().Get("code")
	if r.URL.RawQuery != "" {
		go spotify.GETToken(code)
		buffer.WriteString(code)
	}
	log.Println(r.URL.Query().Get("code"))
	log.Println("redirenting to " + buffer.String())
	http.Redirect(w, r, buffer.String(), http.StatusTemporaryRedirect)
}
