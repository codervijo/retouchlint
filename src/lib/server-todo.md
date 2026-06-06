# Dropped server-side code (TanStack Start → Astro static)

The source (`genai/`) was a TanStack Start app with an SSR/Workers server
entry. Astro here is configured for **static output** (`output: 'static'`),
so the server-only pieces below were **not ported**. They are listed with
`TODO:` markers in case server behaviour is reintroduced (e.g. via an Astro
adapter, API routes, or Cloudflare Workers).

Note: the actual product workflow (create listing → upload → pair → tag →
attest → packet → public share page) is **fully client-side** in the source
— it persists to `localStorage` via `src/lib/store.ts`, which **was** ported
verbatim. None of the server code below is required for that workflow.

## Dropped files

- TODO: `genai/src/server.ts` — Cloudflare Workers `fetch` entry that wraps
  `@tanstack/react-start/server-entry`, normalizes h3-swallowed 500s, and
  renders a fallback error page. No equivalent in static output.

- TODO: `genai/src/start.ts` — `createStart` + request middleware
  (`@tanstack/react-start`) that catches SSR errors and returns a 500 error
  page. SSR-only.

- TODO: `genai/src/lib/api/example.functions.ts` — example `createServerFn`
  (`getGreeting`) with a zod-validated POST handler. Server functions have no
  static-output equivalent; reintroduce as an Astro endpoint
  (`src/pages/api/*.ts`) or a Worker if needed.

- TODO: `genai/src/lib/config.server.ts` — server-only env access
  (`getServerConfig`, reads `process.env` per request). Browser code in Astro
  should use `import.meta.env.PUBLIC_*` instead; secrets need a server runtime.

- TODO: `genai/src/lib/error-page.ts` / `error-capture.ts` /
  `lovable-error-reporting.ts` — SSR error-page rendering + error capture
  used by the server entry/middleware. Not wired into the static build.

- TODO: `genai/src/router.tsx`, `genai/src/routeTree.gen.ts`,
  `genai/src/routes/__root.tsx` — TanStack Router setup (root shell, head
  management, QueryClientProvider, error/404 boundaries). Replaced by Astro
  file-based routing (`src/pages/`), the shared `src/layouts/Layout.astro`,
  and per-page React islands. The `<head>` meta from `__root.tsx` was folded
  into `Layout.astro` and `src/pages/index.astro`.

- The `@tanstack/react-query` `QueryClientProvider` from `__root.tsx` was
  dropped: no ported component issues queries (all data is local-storage
  backed). Reintroduce a provider in `src/components/Island.tsx` if a future
  component needs react-query.
