package spotify

import (
	"net/http"

	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

type NowResponse struct {
	State   spotify.PlayerState    `json:"state"`
	Devices []spotify.PlayerDevice `json:"devices"`
}

// Now TODO: NEEDS COMMENT INFO
func Now(code string, r *http.Request) (NowResponse, error) {
	var CurrentlyPlaying NowResponse
	var devices []spotify.PlayerDevice
	token, err := ProcessToken(code, r)
	if err != nil {
		return CurrentlyPlaying, errors.Wrap(err, "retrieveToken")
	}
	client := Auth(r).NewClient(token)

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
