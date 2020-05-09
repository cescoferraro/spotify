package types

import (
	"github.com/cescoferraro/spotify/api/istructql"
	"github.com/zmb3/spotify"
)

var SavedTrack = istructql.GenerateType(spotify.SavedTrack{
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
