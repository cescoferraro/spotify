package profile

import "github.com/pressly/chi"

func RegisterProfileEndpoints(base string, r *chi.Mux) {
	r.Route(base, func(r chi.Router) {
		r.Post("/", meEndPoint)
	})
}
