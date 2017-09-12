package playlists

import "github.com/pressly/chi"

func RegisterPlaylistsEndpoints(base string, r *chi.Mux) {
	r.Route(base, func(r chi.Router) {
		r.Post("/", playlistEndPoint)
	})
}
