package naphatsite

import "context"

// basePrefixKey carries the relative base prefix (e.g. "../") from the renderer
// (cmd/serve, cmd/ssg) into templ layouts. Layouts combine it with link paths
// so hrefs are relative and work when the output is opened via file://.
type basePrefixKey struct{}

// WithBasePrefix returns a context carrying the relative base prefix for the
// page being rendered.
func WithBasePrefix(ctx context.Context, prefix string) context.Context {
	return context.WithValue(ctx, basePrefixKey{}, prefix)
}

// BasePrefix returns the relative base prefix for the current render, or "".
func BasePrefix(ctx context.Context) string {
	prefix, _ := ctx.Value(basePrefixKey{}).(string)
	return prefix
}
