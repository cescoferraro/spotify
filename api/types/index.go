package types

import "github.com/zmb3/spotify"

type PlayerRequest struct {
	Token  string   `json:"token"`
	Device string   `json:"device"`
	Songs  []string `json:"songs"`
}

type ContextKey struct {
	Name string
}

// PlayerStateResponse TODO: NEEDS COMMENT INFO
type PlayerStateResponse struct {
	State   spotify.PlayerState    `json:"state"`
	Devices []spotify.PlayerDevice `json:"devices"`
}
