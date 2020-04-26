package endpoints

import (
	"bytes"
	"log"
	"net/http"
	"strings"

	"github.com/cescoferraro/spotify/api/tools"
)

func RootEndPoint(w http.ResponseWriter, r *http.Request) {
	log.Println("*")
	var buffer bytes.Buffer
	if tools.IsProd() {
		buffer.WriteString("http://spotify.cescoferraro.xyz/auth/")
	} else {
		buffer.WriteString("http://" + strings.Split(r.Host, ":")[0] + ":3000/auth/")
	}
	if r.URL.RawQuery != "" {
		code := r.URL.Query().Get("code")
		state := r.URL.Query().Get("state")
		buffer.WriteString(code)
		buffer.WriteString("/")
		buffer.WriteString(state)
	}
	log.Println("redirenting to " + buffer.String())
	http.Redirect(w, r, buffer.String(), http.StatusTemporaryRedirect)
}
