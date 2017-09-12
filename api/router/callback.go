package router

import (
	"bytes"
	"log"
	"net/http"
	"strings"

	"github.com/cescoferraro/spotify/api/tools"
)

func CallBackEndPoint(w http.ResponseWriter, r *http.Request) {
	var buffer bytes.Buffer
	if tools.IsProd() {
		buffer.WriteString("http://spotify.cescoferraro.xyz/auth/")
	} else {
		buffer.WriteString("http://" + strings.Split(r.Host, ":")[0] + ":5000/auth/")
	}
	code := r.URL.Query().Get("code")
	state := r.URL.Query().Get("state")
	if r.URL.RawQuery != "" {
		go tools.ProcessToken(code, r)
		buffer.WriteString(code + "/" + state)
	}
	log.Println(r.URL.Query().Get("state"))
	log.Println("redirenting to " + buffer.String())
	http.Redirect(w, r, buffer.String(), http.StatusTemporaryRedirect)
}
