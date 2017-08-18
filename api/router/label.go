package router

import (
	"net/http"

	"github.com/pressly/chi/render"
)

func labelEndPoint(w http.ResponseWriter, r *http.Request) {
	// token := spotify.SPOTIFYAUTH()
	// client := spotify.Auth.NewClient("sdkjfn")
	// err := client.Next()
	// if err != nil {
	// 	log.Println(err.Error())
	// 	return
	// }
	render.JSON(w, r, true)
}
