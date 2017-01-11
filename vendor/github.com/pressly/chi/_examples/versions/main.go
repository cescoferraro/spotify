//
// Versions
// ========
// This example demonstrates the use of the render subpackage and its
// render.Presenter interface to transform a handler response to easily
// handle API versioning.
//
package main

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/pressly/chi"
	"github.com/pressly/chi/_examples/versions/data"
	"github.com/pressly/chi/_examples/versions/presenter/v1"
	"github.com/pressly/chi/_examples/versions/presenter/v2"
	"github.com/pressly/chi/_examples/versions/presenter/v3"
	"github.com/pressly/chi/middleware"
	"github.com/pressly/chi/render"
)

func main() {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(render.UsePresenter(v3.Presenter)) // API version 3 (latest) by default.

	// Redirect for Example convenience.
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/v3/articles/1", 302)
	})

	// API version 3.
	r.Route("/v3", func(r chi.Router) {
		r.Mount("/articles", articleRouter())
	})

	// API version 2.
	r.Route("/v2", func(r chi.Router) {
		r.Use(render.UsePresenter(v2.Presenter))
		r.Mount("/articles", articleRouter())
	})

	// API version 1.
	r.Route("/v1", func(r chi.Router) {
		r.Use(randomErrorMiddleware) // Simulate random error, ie. version 1 is buggy.
		r.Use(render.UsePresenter(v1.Presenter))
		r.Mount("/articles", articleRouter())
	})

	http.ListenAndServe(":3333", r)
}

func articleRouter() http.Handler {
	r := chi.NewRouter()
	r.Get("/", listArticles)
	r.Route("/:articleID", func(r chi.Router) {
		r.Get("/", getArticle)
		// r.Put("/", updateArticle)
		// r.Delete("/", deleteArticle)
	})
	return r
}

func listArticles(w http.ResponseWriter, r *http.Request) {
	articles := make(chan *data.Article, 5)

	// Load data asynchronously into the channel (simulate slow storage):
	go func() {
		for i := 1; i <= 10; i++ {
			articles <- &data.Article{
				ID:    i,
				Title: fmt.Sprintf("Article #%v", i),
				Data:  []string{"one", "two", "three", "four"},
				CustomDataForAuthUsers: "secret data for auth'd users only",
			}
			time.Sleep(100 * time.Millisecond)
		}
		close(articles)
	}()

	// Start streaming data from the channel.
	render.Respond(w, r, articles)
}

func getArticle(w http.ResponseWriter, r *http.Request) {
	// Load article.
	if chi.URLParam(r, "articleID") != "1" {
		render.Respond(w, r, data.ErrNotFound)
		return
	}
	article := &data.Article{
		ID:    1,
		Title: "Article #1",
		Data:  []string{"one", "two", "three", "four"},
		CustomDataForAuthUsers: "secret data for auth'd users only",
	}

	// Simulate some context values:
	// 1. ?auth=true simluates authenticated session/user.
	// 2. ?error=true simulates random error.
	if r.URL.Query().Get("auth") != "" {
		r = r.WithContext(context.WithValue(r.Context(), "auth", true))
	}
	if r.URL.Query().Get("error") != "" {
		render.Respond(w, r, errors.New("error"))
		return
	}

	render.Respond(w, r, article)
}

func randomErrorMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rand.Seed(time.Now().Unix())

		// One in three chance of random error.
		if rand.Int31n(3) == 0 {
			errors := []error{data.ErrUnauthorized, data.ErrForbidden, data.ErrNotFound}
			render.Respond(w, r, errors[rand.Intn(len(errors))])
			return
		}
		next.ServeHTTP(w, r)
	})
}
