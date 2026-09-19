# day3.app.docs

Public API documentation for [day3](https://day3.app), served at
**[docs.day3.app](https://docs.day3.app)**.

Nextra 4 on Next.js 16, statically exported and hosted on GitHub Pages. Same
stack as [exit1.dev.docs](https://github.com/Mopra/exit1.dev.docs).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # next build -> out/, then Pagefind -> out/_pagefind
```

`next build` exports the whole site to `out/`, then Pagefind indexes the exported
HTML in place. Indexing the export rather than `.next/server/app` means the
search index always matches what actually shipped, and nothing binary needs
committing.

## Deploy

Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds and publishes `out/` to GitHub Pages.

The custom domain comes from [`public/CNAME`](public/CNAME). `public/.nojekyll`
is insurance: both `_next/` and `_pagefind/` start with an underscore, which a
stray Jekyll pass would drop.

## Content

One page per resource under [`app/`](app), as `page.mdx`. Sidebar order and
titles come from the `_meta.js` file in each directory.

Pages are grouped by resource rather than one page per endpoint. That is
deliberate: roughly 40 operations split one-per-page would be 40 thin pages, and
thin pages on a new domain tend to sit in Google's "Discovered, currently not
indexed" bucket instead of ranking.

| Path | Covers |
| --- | --- |
| `app/page.mdx` | Introduction |
| `app/quickstart`, `app/authentication`, `app/conventions`, `app/errors` | The things that apply everywhere |
| `app/emails` … `app/suppressions` | One page per resource, including `app/automations` |
| `app/webhooks`, `app/mcp` | Integrations |
| `app/guides` | Task-shaped walkthroughs |

### Where the content comes from

Everything here is derived from the app repo (`../day3.app`), which is the source
of truth:

| Source | Gives us |
| --- | --- |
| `src/lib/api-docs.ts` | `buildReferenceMarkdown()`, the canonical reference. `test/api-docs.test.ts` asserts every `app/api/v1/**/route.ts` appears in it, so it cannot fall behind the code. |
| `src/api/v1/serialize.ts` | Exact response shapes. Every field in these docs is a real serializer field. |
| `src/api/v1/errors.ts`, `scopes.ts`, `auth.ts` | Error codes, the two scopes, key format. |
| `docs/api-v1-spec.md` | Design rationale. Parts of §1 are stale: it predates scopes. |
| `docs/webhooks.md` | Receiver contract and the signature algorithm. |
| `src/mcp/tools.ts` | The MCP tool list. |
| `src/lib/plans-catalog.ts` | Plan limits: the free tier's 500-subscriber cap and the 100-email sandbox allowance. |
| `src/lib/segment-filter-schema.ts` | Segment operators, and the rule that every `value` is a string. |
| `src/services/shared-domain.ts` | The day3 test address, and the rule that it only ever carries sandbox mail. |

When the API changes, re-read the serializers and `api-docs.ts` rather than
trusting the spec document.

## Theming

Brand tokens in [`app/globals.css`](app/globals.css) mirror the marketing site's
cream / espresso / caramel palette. Nextra derives its whole scale from the one
HSL triple passed to `<Head color>` in [`app/layout.tsx`](app/layout.tsx), and
that triple is duplicated as `--link` in `globals.css`. **Change both together.**

Link lightness deviates from caramel's native 50%: Nextra spends the primary on
link text, where 50% only reaches 2.97:1 on cream. 38% light / 56% dark clears
4.5:1 in both themes.

## Note on the zod pin

`package.json` pins `zod` to `4.3.6` via `overrides`. Nextra 4.6.1's `Layout`
destructures `children` out of its props and then validates the *rest* against a
schema that still declares `children` as required. zod up to 4.3.6 let a bare
`z.custom()` pass on `undefined`, so the bug was latent; zod 4.4.0 tightened
that, and every render throws:

```
Invalid input: expected nonoptional, received undefined
  -> at children
```

Nextra floats zod on `^4.1.12`, so a fresh install picks up the breaking minor.
Drop the override once Nextra fixes the schema.

`exit1.dev.docs` has the same latent problem and only builds because its
lockfile still resolves zod 4.3.6. It will break the next time those
dependencies are refreshed.
