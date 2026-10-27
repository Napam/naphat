module naphatsite

go 1.27.3

// some npm deps ship go sources without a go.mod, keep them out of ./...
ignore ./web/node_modules

tool (
	github.com/a-h/templ/cmd/templ
	github.com/bokwoon95/wgo
)

require (
	github.com/a-h/templ v0.3.1100
	github.com/go-chi/chi/v5 v5.5.0
)

require (
	github.com/a-h/parse v0.0.0-20250122154542-74294addb73e // indirect
	github.com/andybalholm/brotli v1.2.7 // indirect
	github.com/bokwoon95/wgo v0.7.2 // indirect
	github.com/cenkalti/backoff/v4 v4.3.0 // indirect
	github.com/cli/browser v1.3.0 // indirect
	github.com/fatih/color v1.19.0 // indirect
	github.com/fsnotify/fsnotify v1.10.1 // indirect
	github.com/mattn/go-colorable v0.1.16 // indirect
	github.com/mattn/go-isatty v0.0.24 // indirect
	github.com/natefinch/atomic v1.0.1 // indirect
	github.com/stretchr/testify v1.11.1 // indirect
	golang.org/x/mod v0.42.0 // indirect
	golang.org/x/net v0.62.0 // indirect
	golang.org/x/sync v0.24.0 // indirect
	golang.org/x/sys v0.49.0 // indirect
	golang.org/x/tools v0.52.0 // indirect
)
