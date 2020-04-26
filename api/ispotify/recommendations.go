package ispotify

import (
	"context"
	"github.com/pkg/errors"
	"github.com/zmb3/spotify"
)

// GetRecommendations TODO: NEEDS COMMENT INFO
func GetRecommendations(artists []string, ctx context.Context) (*spotify.Recommendations, error) {
	recommendations := new(spotify.Recommendations)
	var err error
	client, err := SpotifyClientFromContext(ctx)
	if err != nil {
		return recommendations, err
	}
	artistSeed := []spotify.ID{}
	for _, artist := range artists {
		artistSeed = append(artistSeed, spotify.ID(artist))

	}
	seed := spotify.Seeds{
		Artists: artistSeed,
	}

	recommendations, err = client.GetRecommendations(seed, new(spotify.TrackAttributes), new(spotify.Options))
	if err != nil {

		return recommendations, errors.Wrap(err, "GetRecommendations")
	}
	return recommendations, nil
}
