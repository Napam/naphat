package main

import (
	"bytes"
	"context"
	"io"
	"io/fs"
	"log/slog"
	"os"
	"path/filepath"
	"strings"

	"naphatsite"
	"naphatsite/web/pages"
)

func main() {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	for _, p := range pages.Pages {
		ctx := naphatsite.WithBasePrefix(context.Background(), p.BasePrefix())
		outPath := filepath.Join("docs", p.FilePath())

		// Render into a buffer first so asset URLs can be rewritten before
		// writing the file.
		var buf bytes.Buffer
		if err := p.Render(ctx, &buf); err != nil {
			logger.Error(
				"Could not render page",
				slog.String("path", p.Path),
				slog.Any("error", err),
			)
			os.Exit(1)
		}

		// StaticRootPath emits root-absolute URLs (/static/...) which break
		// when dist/ is opened via file:// or served from a non-root path.
		// Rewrite them to be depth-relative: depth is the number of path
		// segments in FilePath(), i.e. the number of "../" hops back to dist/.
		depth := strings.Count(p.FilePath(), "/")
		html := strings.ReplaceAll(buf.String(), "/static/", strings.Repeat("../", depth)+"static/")

		if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
			logger.Error(
				"Could not create output directory",
				slog.String("path", outPath),
				slog.Any("error", err),
			)
			os.Exit(1)
		}
		f, err := os.Create(outPath)
		if err != nil {
			logger.Error(
				"Could not create output file",
				slog.String("path", outPath),
				slog.Any("error", err),
			)
			os.Exit(1)
		}
		if _, err := f.WriteString(html); err != nil {
			_ = f.Close()
			logger.Error(
				"Could not write output file",
				slog.String("path", outPath),
				slog.Any("error", err),
			)
			os.Exit(1)
		}
		if err := f.Close(); err != nil {
			logger.Error(
				"Could not close output file",
				slog.String("path", outPath),
				slog.Any("error", err),
			)
			os.Exit(1)
		}
		logger.Info("Wrote page", slog.String("url", p.Path), slog.String("file", outPath))
	}

	if err := copyDir("web/static", "docs/static"); err != nil {
		logger.Error("Could not copy static assets", slog.Any("error", err))
		os.Exit(1)
	}
	logger.Info("Static site built into docs/")
}

// copyDir copies the src directory tree (files and dirs) into dst, preserving
// the directory structure (including nested dirs like page-files/).
func copyDir(src, dst string) error {
	return filepath.WalkDir(src, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		rel, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}
		if rel == "." {
			return nil
		}
		target := filepath.Join(dst, rel)
		if d.IsDir() {
			return os.MkdirAll(target, 0o755)
		}
		return copyFile(path, target)
	})
}

func copyFile(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer func() { _ = in.Close() }()

	if err := os.MkdirAll(filepath.Dir(dst), 0o755); err != nil {
		return err
	}
	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	if _, err := io.Copy(out, in); err != nil {
		_ = out.Close()
		return err
	}
	return out.Close()
}
