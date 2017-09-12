package following

import "github.com/pressly/chi"

func RegisterFollowingEndpoints(base string, r *chi.Mux) {
	r.Route(base, func(r chi.Router) {
		r.Post("/", followingEndPoint)
	})
}
