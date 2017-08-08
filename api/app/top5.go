package app

import (
	"log"
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)


func FollowLabel(code, label string) (error) {
	var err error
	token, err := RetrieveToken(code)
	if err != nil {
		log.Println("RetrieveToken")
		errors.Wrap(err, "retrieveToken")
		return err
	}
	client := SPOTIFYAUTH.NewClient(token)

	artists, err := client.CurrentUsersFollowedArtists()
	if err != nil {
		errors.Wrap(err, "CurrentUsersFollowedArtists")
		return err
	}
	log.Println(artists.Total)

	result, err := client.Search(
		"label:" + label,
		spotify.SearchTypeArtist)

	if err != nil {
		log.Println("client.Search")
		log.Println(err.Error())
		errors.Wrap(err, "Search")
		return err
	}

	//maxx, err := strconv.Atoi(max)
	//if err != nil {
	//	errors.Wrap(err, "strconv.Atoi")
	//	return err
	//}

	var ids []string
	for index, artist := range result.Artists.Artists {
		if index <= 4 {
			ids = append(ids, artist.ID.String())
			log.Println(artist.ID)
		}
	}
	log.Println(ids)

	err = FollowArtists(code, ids...)
	if err != nil {
		log.Println("FollowArtists")
		log.Println(err.Error())
		return err
	}

	return nil
}
