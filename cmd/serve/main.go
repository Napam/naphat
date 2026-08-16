package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"naphatsite"
	"naphatsite/lib/env"
	"naphatsite/lib/logging"
	"naphatsite/web/pages"
)

func main() {
	handler := logging.NewHandler(&slog.HandlerOptions{
		Level: slog.LevelInfo,
	})
	logger := slog.New(handler)

	cwd, err := os.Getwd()
	if err != nil {
		logger.Error("Could not get current workdir", slog.Any("error", err))
	}

	logger.Info("Initializing naphatsite", slog.String("cwd", cwd))

	router := chi.NewRouter()
	// Redirect /path/ → /path so trailing-slash variants of a page also work.
	router.Use(middleware.RedirectSlashes)

	naphatsite.SetupStatic(router)

	for _, p := range pages.Pages {
		handler := func(w http.ResponseWriter, r *http.Request) {
			ctx := naphatsite.WithBasePrefix(r.Context(), p.BasePrefix())
			_ = p.Render(ctx, w)
		}
		router.Get(p.Path, handler)
		// Also serve the flat-file URL (e.g. /who-is-this-man.html). The static
		// output links to the real file (so it works when opened via file://),
		// and this keeps the dev server consistent with it.
		fileURL := p.Path + ".html"
		if p.Path == "/" {
			fileURL = "/index.html"
		}
		router.Get(fileURL, handler)
	}

	logAttrs := []slog.Attr{
		slog.String("address", env.Vars.Host+":"+env.Vars.Port),
	}
	if env.Vars.LiveReloadHost != "" && env.Vars.LiveReloadPort != "" {
		logAttrs = append(logAttrs, slog.String(
			"live_reload_address",
			env.Vars.LiveReloadHost+":"+env.Vars.LiveReloadPort+" (you have to use 'task dev' for this to work)",
		))
	}
	logger.LogAttrs(context.Background(), slog.LevelInfo, "Server running", logAttrs...)
	err = http.ListenAndServe(env.Vars.Host+":"+env.Vars.Port, router)
	if err != nil {
		logger.Error("Server did not exit cleanly", slog.Any("error", err))
		os.Exit(1)
	}
}
