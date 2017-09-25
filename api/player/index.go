package player

import "github.com/pressly/chi"

// RegisterPlayerEndpoints TODO: NEEDS COMMENT INFO
func RegisterPlayerEndpoints(base string, r *chi.Mux) {
	r.Route(base, func(r chi.Router) {
		r.Post("/", nowPlayingEndPoint)
		r.Post("/play", playEndPoint)
		r.Post("/play/{id}", playSongEndPoint)
		r.Post("/play/playlist", playPlaylistEndPoint)

		r.Post("/next", nextEndPoint)
		r.Post("/pause", pauseEndPoint)

		r.Post("/previous", previousEndPoint)

		r.Post("/repeat/{state}", repeatEndPoint)
		r.Post("/volume/{percent}", volumeEndPoint)
	})

}
