package app

import (
	"log"
	"github.com/zmb3/spotify"
)

type MeResponse struct {
	Following       *spotify.FullArtistCursorPage;
	Playlist        []spotify.SimplePlaylist;
	Recommendations *spotify.Recommendations;
	User            *spotify.PrivateUser;
}

func Me(code string) (MeResponse, error) {

	var response MeResponse
	user, err := GetProfile(code)
	if err != nil {
		log.Println(err.Error())
		return response, err
	}

	following, err := Getfollowing(code)
	if err != nil {
		log.Println("getfollowing ERROR")
		log.Println(err.Error())
		return response, err
	}
	var artistID []string
	for _, artist := range following.Artists {
		artistID = append(artistID, artist.ID.String())
	}

	playlists, err := GetPLaylists(code)
	if err != nil {
		log.Println("getPLaylists  ERROR")
		log.Println(err.Error())
		return response, err
	}

	var recommendations *spotify.Recommendations
	if len(artistID) > 0 {

		var seeds [] string
		for i, artist := range artistID {
			if i <= 4 {
				seeds = append(seeds, artist)
			}
		}

		recommendations, err = GetRecommendations(seeds, code)
		if err != nil {
			log.Println("getRecommendations  ERROR")
			log.Println(err.Error())
			return response, err
		}
	}
	response = MeResponse{Following:following, Recommendations:recommendations, Playlist:playlists, User:user }
	return response, nil

}
