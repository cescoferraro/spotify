package types

import (
	"github.com/cescoferraro/structql"
	"github.com/zmb3/spotify"
)

var SavedTrack = structql.GenerateType(spotify.SavedTrack{
	AddedAt: "",
	FullTrack: spotify.FullTrack{
		SimpleTrack: spotify.SimpleTrack{
			Artists:          []spotify.SimpleArtist{{}},
			AvailableMarkets: []string{""},
		},
		Album: spotify.SimpleAlbum{
			AvailableMarkets: []string{""},
			Images:           []spotify.Image{{}},
		},
	},
})
