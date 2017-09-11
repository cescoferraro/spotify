package router

import (
	"fmt"
	"net/http"

	"github.com/cescoferraro/spotify/api/tools"
	"github.com/pkg/errors"
	"github.com/pressly/chi/render"
	"github.com/zmb3/spotify"
)

// NowResponse TODO: NEEDS COMMENT INFO
type NowResponse struct {
	State   spotify.PlayerState    `json:"state"`
	Devices []spotify.PlayerDevice `json:"devices"`
}

// Now TODO: NEEDS COMMENT INFO
func Now(code string, r *http.Request) (NowResponse, error) {
	var CurrentlyPlaying NowResponse
	var devices []spotify.PlayerDevice
	token, err := tools.ProcessToken(code, r)
	if err != nil {
		return CurrentlyPlaying, errors.Wrap(err, "retrieveToken")
	}
	client := tools.Auth(r).NewClient(token)

	response, err := client.PlayerState()
	if err != nil {
		return NowResponse{State: *response, Devices: devices}, errors.Wrap(err, "next error")
	}
	devices, err = client.PlayerDevices()
	if err != nil {
		return NowResponse{State: *response, Devices: devices}, errors.Wrap(err, "next error")
	}
	return NowResponse{State: *response, Devices: devices}, nil
}
func nowPlayingEndPoint(w http.ResponseWriter, r *http.Request) {
	body, err := tools.GetBODY(r)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	user, err := Now(body, r)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	fmt.Println(user.State)
	render.JSON(w, r, user)
}
