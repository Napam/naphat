//go:build noembed

package naphatsite

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// StaticRootPath returns the path as-is (no content hashing in dev mode).
func StaticRootPath(path string) string {
	return "/" + path
}

// SetupStatic registers a file server with no-cache headers for development.
func SetupStatic(r chi.Router) {
	fileServer := http.FileServer(http.Dir("web/static"))
	r.Handle("/static/*", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		http.StripPrefix("/static/", fileServer).ServeHTTP(w, r)
	}))
}
