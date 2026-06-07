# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

There is no test suite. `npm install` is the source of truth, but a `pnpm-lock.yaml` also exists — prefer `npm` to match the lockfile used in scripts/CI.

## Project context

OpportunityRadar is a Next.js 16 (App Router) / React 19 marketing + listings site for East African opportunities — government tenders, NGO jobs, grants/scholarships, plus supporting tools (CV builder, past papers, property, guides). It is built and deployed via **v0** (v0.app) and Vercel: v0 pushes commits directly to `main`, and every merge to `main` auto-deploys. Treat the design system and component conventions as v0-generated — keep edits idiomatic to shadcn/ui.

## Architecture

**Backend is external.** All opportunity data comes from a separate API at `https://api.opportunityradar.africa` (FastAPI-style endpoints: `/api/opportunities`, `/api/stats`, `/subscribe`). This repo is frontend-only. `lib/api.ts` is the single source of truth for API access — types (`Opportunity`, `Stats`), the country/category constants and color maps, fetch helpers, and deadline-formatting utilities all live there. Add new API calls here, not inline in pages.

**Data fetching is server-side by default.** Listing pages (`app/page.tsx`, `tenders`, `grants`, `jobs`, `guides`) are React Server Components that `await fetchOpportunities(...)` directly and wrap results in `<Suspense>` with skeleton fallbacks. `fetch` uses `next: { revalidate: 300 }` (5-min ISR cache). Pages read filters from `searchParams` (a `Promise` in Next 16 — must be awaited). Interactive pages that need browser APIs/state (`cv-builder`, `tools`, `past-papers`, `property`, `dashboard`) are marked `"use client"`.

**CORS proxy.** `next.config.mjs` rewrites `/proxy/:path*` → `api.opportunityradar.africa/:path*` so client-side calls avoid CORS. Server components call `API_BASE_URL` directly; client-side code should route through `/proxy/*`.

**`fetchStats` degrades gracefully** — it returns hardcoded fallback numbers on failure rather than throwing, so the homepage never breaks when the API is down. Follow this pattern for non-critical data.

**Routing.** `app/guides/[slug]/` is a dynamic route; `route-config.ts` sets `export const dynamic = 'force-dynamic'` for it. Note the guides slug page is large (~650 lines) and contains inline content data.

## Conventions

- **Path alias:** `@/*` maps to the repo root (`@/components`, `@/lib`, `@/hooks`).
- **UI:** shadcn/ui (New York style) in `components/ui/`; app-specific components (`navbar`, `footer`, `opportunity-card`, `search-bar`, etc.) live directly in `components/`. Icons from `lucide-react`.
- **Styling:** Tailwind CSS v4 (CSS-first config via `@import` in `app/globals.css`, not a JS config). The brand palette is defined as CSS custom properties in `:root` (`--navy`, `--accent-green`, `--amber`) and mapped to semantic shadcn tokens (`--primary`, `--accent`, etc.). Use the semantic tokens / Tailwind classes rather than raw hex.
- **Fonts:** `DM_Sans` (`--font-dm-sans`, body) and `Syne` (`--font-syne`, display) loaded via `next/font/google` in the root layout.
- **Analytics/Ads:** Vercel Analytics (production only) and Google AdSense are wired into `app/layout.tsx`.

## Domain notes

- Categories are exactly `'Government Tender' | 'Grant/Scholarship' | 'Job'` (see `CATEGORIES`/`CATEGORY_COLORS`). Countries are the East African set in `COUNTRIES` plus `'International'`/`'East Africa'`.
- Deadlines arrive as strings that may be empty or the literal `'None'`. Always use `getDeadlineStatus`/`formatDeadline` from `lib/api.ts` to interpret them — don't parse dates inline.
- WhatsApp is a primary conversion channel (`whatsapp-button` component, `whatsapp_teaser` fields). CV templates are static assets in `public/cv-templates/` (kept as anonymized placeholders — see recent commits).
