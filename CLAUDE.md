# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page wedding website for **Alexita & Chico** (groom: Chico, bride: Alexita). The site covers two ceremonies — a civil event in Argentina (Feb 20, 2027) and a religious celebration in Brazil (March 6, 2027) — and is localized for guests in three regions: **Brazil (pt)**, **Argentina (es)**, and **International (en)**.

Live site: https://web-casamiento-five.vercel.app/

## Workflow

This is a solo project. **All development happens directly on `main`** — no feature branches, no PRs. Commit, push, Vercel auto-deploys.

The `conductor/` folder contains a heavy TDD workflow from earlier iterations. Treat it as historical reference, not active process. Past tracks are archived under `conductor/archive/` and can be useful for understanding *why* a feature exists; don't re-create the rigorous track-plan-checkpoint cycle for new work unless explicitly asked.

## Commands

```bash
npm install            # install deps (Next 16, React 19)
npm run dev            # start dev server at http://localhost:3000
npm run build          # production build
npm run lint           # ESLint
npm test               # run all vitest tests once

# Run a single test file
npx vitest run src/app/__tests__/actions.test.ts

# Run tests matching a name pattern
npx vitest run -t "submitRSVP"
```

Tests use **Vitest + jsdom + Testing Library**. Setup file: `src/test/setup.ts`. Tests live in `__tests__/` folders co-located with the code they cover (e.g., `src/app/__tests__/actions.test.ts` tests `src/app/actions.ts`).

## Environment variables

Required in `.env.local` (and on Vercel for deployment):

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (test or live) |
| `STRIPE_SECRET_KEY` | Stripe server-side secret |
| `ADMIN_PASSWORD` | Gates `/admin` page |

`src/lib/supabase.ts` falls back to placeholders if Supabase env vars are missing (with a warning in non-test environments), so the app boots without crashing — database calls just fail.

## Architecture

### Single-page composition

`src/app/page.tsx` renders every section in order: `Navbar`, `Hero`, `Welcome`, `Countdown`, *(placeholder "The Couple")*, `EventDetails`, `GiftGrid`, `RSVPForm`, `Guestbook`. Navigation is anchor-based (smooth scroll to `#id`).

### `siteConfig` is the single source of truth

`src/site.config.ts` exports `siteConfig` containing **everything content-related**: couple names, theme colors/fonts, event details (date, location, address, map link) per region, the gift catalog with prices localized per region, region/language metadata (currency, labels, all UI strings), and bank transfer details for AR.

To change copy, prices, dates, or locations, **edit `site.config.ts`** — do not hardcode strings in components. The shape of `regions[region].content` is the canonical list of translatable strings.

### Region & language

`src/context/LanguageContext.tsx` provides `useLanguage()` returning `{ region, setRegion, config }` where `config = siteConfig.regions[region]`. Region is one of `'br' | 'ar' | 'en'`, persisted to `localStorage` under key `wedding_region`. Default is `'br'`.

Components consume the active region's strings via `useLanguage().config.content.*`. The gift catalog uses `gift.localized[region]` for name/description/price and `gift.category[region]` for the category label.

### Server actions (no API routes)

`src/app/actions.ts` ('use server') exposes:
- `submitRSVP(data)` → inserts into Supabase `rsvps` table
- `getRSVPs()` → reads RSVPs (used by admin)
- `validateAdminPassword(password)` → checks against `ADMIN_PASSWORD` env var
- `createPaymentIntent(amount)` → creates a Stripe PaymentIntent (currency hardcoded to `brl`)
- `submitGiftMessage(data)` → inserts into Supabase `gift_messages` table

Stripe is lazily initialized inside `getStripe()` so the module doesn't crash when `STRIPE_SECRET_KEY` is absent (e.g., during tests).

### Database

Two tables, both with RLS enabled and public-insert + public-select policies (intentionally lax for prototype — admin reads use the same policy). Schema files at the repo root:
- `supabase_schema.sql` — `rsvps`
- `supabase_gift_schema.sql` — `gift_messages`

Apply these via the Supabase SQL Editor when setting up a new project. The MCP server in `.mcp.json` (project ref `bqekcntdnkipdqfmaikh`) can manage the DB once authenticated, but **OAuth doesn't work from sandboxed remote sessions** — apply schema changes manually via the dashboard, or run `claude` locally with `/mcp` to authenticate the MCP for tooling work.

### Admin

`src/app/admin/page.tsx` is a password-gated dashboard that calls `validateAdminPassword` then `getRSVPs`.

### Styling

Tailwind CSS v4 (via `@tailwindcss/postcss`). Theme tokens live in `siteConfig.theme.colors`. Fonts: Playfair Display (headings) + Inter (body) loaded via `next/font` and exposed as CSS vars `--font-playfair` and `--font-inter`. Animations use Framer Motion; icons use `lucide-react`.

## Useful skills installed

All skills live under `.agents/skills/` and are committed to the repo. Read the matching `SKILL.md` (plus `references/*.md` if it has them) **before** doing related work — they encode framework-specific traps and best practices.

**Supabase** (from `supabase/agent-skills`):
- `supabase` — Auth, RLS, MCP, client libs. Critical trap: never use `user_metadata` for authorization (it's user-editable; use `app_metadata`).
- `supabase-postgres-best-practices` — Postgres patterns: indexing, RLS performance, connection pooling, locking.

**Design & Testing** (from `anthropics/skills`):
- `frontend-design` — Production-grade frontend with high design quality. Use whenever building or restyling web components, pages, or visual layouts. Pushes toward a clear, bold aesthetic direction rather than generic "AI slop". Read before any UI work.
- `theme-factory` — 10 preset themes (colors + fonts) for styling artifacts, plus on-the-fly theme generation. Useful for prototyping section variants or generating one-off visual artifacts (save-the-dates, RSVP cards).
- `webapp-testing` — Playwright-based browser automation. Use to verify UI behavior end-to-end, capture screenshots, and inspect console logs of the running app (`npm run dev` must be running first).

**Frontend / Next.js / Vercel** (from `vercel-labs/agent-skills`):
- `vercel-react-best-practices` — React + Next.js performance patterns. Read before writing or refactoring components.
- `vercel-composition-patterns` — Compound components, render props, React 19 API patterns. Read before designing reusable component APIs.
- `web-design-guidelines` — UI/accessibility audit checklist. Read before reviewing UI or addressing layout/a11y issues.
- `vercel-react-view-transitions` — `<ViewTransition>` API for smooth section/route animations. Read before adding page transitions.
- `deploy-to-vercel` — Vercel deployment patterns and gotchas.
- `vercel-cli-with-tokens` — Token-based Vercel CLI usage (env vars, deploys from sessions).
- `vercel-optimize` — Cost/performance tuning for deployed Vercel projects (Function Invocations, Build Minutes, Core Web Vitals).

Install or update via `npx skills add <repo>` (e.g., `npx skills add anthropics/skills --skill frontend-design`, `npx skills add vercel-labs/agent-skills --all`). The `skills-lock.json` at the repo root tracks what's installed. The full Anthropic skills marketplace is at https://github.com/anthropics/skills.
