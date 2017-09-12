package app

import "github.com/pressly/chi"

func RegisterAppEndpoints(base string, version string, r *chi.Mux) {
	r.Route(base, func(r chi.Router) {
		r.Get("/login", loginEndPoint("dashboard"))
		r.Post("/logout", logoutEndPoint)
		r.Get("/version", versionEndPoint(version))
		r.Get("/status", statusEndPoint)
	})
}
