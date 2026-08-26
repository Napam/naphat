package pages

import (
	"context"
	"io"
	"strings"

	"naphatsite/web/pages/articles/apato-ad"
	"naphatsite/web/pages/articles/neural-networks-a-geometric-interpretation"
	"naphatsite/web/pages/articles/why-bother-using-vim"
	"naphatsite/web/pages/articles/whoisthisman"
	"naphatsite/web/pages/root"
)

// Page is a single route rendered by both the dev server (cmd/serve) and the
// static site generator (cmd/ssg). The path is the canonical URL with no
// trailing slash (the root is "/").
type Page struct {
	Path   string // canonical URL, no trailing slash (root is "/")
	Render func(ctx context.Context, w io.Writer) error
}

// Pages is the single source of truth for all page paths.
var Pages = []Page{
	{Path: "/", Render: root.RootPage().Render},
	{Path: "/articles/who-is-this-man", Render: whoisthisman.Page().Render},
	{Path: "/articles/apato-ad", Render: apatoad.Page().Render},
	{Path: "/articles/neural-networks-a-geometric-interpretation", Render: neuralnetworksageometricinterpretation.Page().Render},
	{Path: "/articles/why-bother-using-vim", Render: whybotherusingvim.Page().Render},
}

// FilePath derives the static output file from the URL path as a flat file:
// "/" → "index.html", "/who-is-this-man" → "who-is-this-man.html". Flat files
// load reliably from file:// and any static host without directory navigation.
func (p Page) FilePath() string {
	if p.Path == "/" {
		return "index.html"
	}
	return strings.TrimPrefix(p.Path, "/") + ".html"
}

// BasePrefix returns the "../" hops from this page's output file back to the
// site root, used to make links relative so they work when opened via file://.
// Root is "", a page at depth 1 is "../", and so on.
func (p Page) BasePrefix() string {
	return strings.Repeat("../", strings.Count(p.FilePath(), "/"))
}
