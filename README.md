# Naphats Site

Personal static site, deployed to GitHub Pages at [naphat.no](https://naphat.no).

Scaffolded from [backwego-template](https://github.com/Napam/backwego-template).

Server-rendered pages with [templ](https://templ.guide) for HTML,
[tailwindcss](https://tailwindcss.com/) for styling, and [Lit](https://lit.dev/)
web components for progressive enhancement. The whole site renders to static
HTML plus asset files.

Requirements:

- [go](https://go.dev)
- [task](https://taskfile.dev)
- [bun](https://bun.com/) - for frontend asset building

## Develop

Run `task dev`. It starts the dev server with live reload for Go, templ,
TypeScript, and TailwindCSS. Open the site at `localhost:7331` (the live
reload proxy; the app itself listens on `PORT`, default `8080`).

- Application entrypoint: `cmd/serve/main.go`
- Pages: `web/pages/` (templ + optional `.ts` per page)

## Build and deploy

`task build.site` builds the entire static site into `docs/`:

1. `gen.templ` regenerates templ code
2. tailwindcss builds `web/static/tailwind.css`
3. `build.ts` bundles JS into `web/static/bundle.js` and per-page files into
   `web/static/page-files/`
4. `cmd/ssg` renders each page from the `Pages` registry into `docs/*.html`
   and copies `web/static` → `docs/static`

Then commit `docs/` and push to `master`. GitHub Pages serves the site
straight from `docs/` — no build step on GitHub's side. Custom domain via
`docs/CNAME`; `.nojekyll` prevents Jekyll processing.

Asset URLs in the rendered pages are depth-relative (`static/...` or
`../static/...`), so the output also works when opened via `file://`.

## Project structure

```
.
├── base.go               relative base-prefix helpers for links
├── cmd
│   ├── serve             dev server entrypoint
│   └── ssg               static site generator → docs/
├── docs                  static site output, committed and deployed to GitHub Pages
├── lib                   shared go libraries (env, hashfs, logging, templutils)
├── Taskfile.yml          all tasks
├── web
│   ├── assets            source assets, hardlinked into static/assets
│   ├── build.ts          builds web assets → web/static
│   ├── layouts           base templ layout
│   ├── lib               shared typescript (web components → static/bundle.js)
│   ├── pages             pages registry — single source of truth for routes
│   ├── static            build artifacts (bundle.js, page-files/, tailwind.css), gitignored
│   └── tailwind.css      tailwind input
```

`web/static/` is gitignored build output; `docs/static/` is committed.
`cmd/ssg` skips copying `.gitignore` so the assets stay visible to git.

## How it works

- **One source of truth for pages:** all routes live in the `Pages` list in
  `web/pages/pages.go`. The dev server and the static site generator both
  consume it, so a page added there appears in `task dev` and in `docs/`
  after `task build.site`.
- **SSR-first:** pages render HTML on the server. Web components enhance
  where needed; page scripts interact with them via the DOM.
- **Static-only:** no database, no API. Content lives in the templ pages.

## JavaScript bundling

`web/build.ts` produces two kinds of bundles:

- **Shared bundle:** everything in `web/lib/**/*.ts` becomes a single
  `static/bundle.js`, loaded synchronously in `<head>` so all custom elements
  are registered before the body parses.
- **Page bundles:** a `.ts` file next to a page's `.templ` becomes its own
  bundle at `static/page-files/<dir>/<name>.js`, loaded per page with
  `<script defer>`.

One rule: **don't import from `lib/` in page files.** The iife bundle has no
code splitting, so lib code would be duplicated per page and re-registering a
custom element throws. `bundle.js` loads first, so page scripts can assume all
components exist.

## Checks

`task check` runs all checks in parallel: formatting, linting, and compile
for the Go code, plus prettier, eslint, typescript, and a scratch bundle build
for the web code. Use `task check.go` / `task check.web` for one side, and
`task fix` to auto-fix formatting and lint issues.

## Tech stack

- [templ](https://templ.guide) - HTML templating
- [tailwindcss](https://tailwindcss.com/) - CSS styling
- [Lit](https://lit.dev/) - web components
- [go-chi](https://github.com/go-chi/chi) - HTTP router

## License

[MIT](LICENSE)