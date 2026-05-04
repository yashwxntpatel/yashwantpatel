# Yashwant Patel — Portfolio
## Production-Optimized Build for Cloudflare Pages

```bash
npm install
npm run build
npm run preview
```

---

## What Was Removed (Critical Bloat Elimination)

### 🗑️ Entire UI Component Library — DELETED
The project shipped with **63 shadcn/ui components** in `/src/components/ui/`. After a full usage audit, **zero of them** were actually rendered in the app. Every single one was dead code.

| Removed Components | Removed Dependencies |
|---|---|
| accordion, alert, alert-dialog | `@radix-ui/react-accordion` |
| aspect-ratio, avatar, badge | `@radix-ui/react-alert-dialog` |
| breadcrumb, button, calendar | `@radix-ui/react-aspect-ratio` |
| card, carousel, chart | `@radix-ui/react-avatar` |
| checkbox, collapsible, command | `@radix-ui/react-checkbox` |
| context-menu, dialog, drawer | `@radix-ui/react-collapsible` |
| dropdown-menu, form, hover-card | `@radix-ui/react-context-menu` |
| input, input-otp, label | `@radix-ui/react-dialog` |
| menubar, navigation-menu | `@radix-ui/react-dropdown-menu` |
| pagination, popover, progress | `@radix-ui/react-hover-card` |
| radio-group, resizable | `@radix-ui/react-label` |
| scroll-area, select, separator | `@radix-ui/react-menubar` |
| sheet, sidebar, skeleton | `@radix-ui/react-navigation-menu` |
| slider, sonner, switch, table | `@radix-ui/react-popover` |
| tabs, textarea, toast, toaster | `@radix-ui/react-progress` |
| toggle, toggle-group, tooltip | `@radix-ui/react-radio-group` |
| use-toast hook | `@radix-ui/react-scroll-area` |
| | `@radix-ui/react-select` |
| | `@radix-ui/react-separator` |
| | `@radix-ui/react-slider` |
| | `@radix-ui/react-slot` |
| | `@radix-ui/react-switch` |
| | `@radix-ui/react-tabs` |
| | `@radix-ui/react-toast` |
| | `@radix-ui/react-toggle` |
| | `@radix-ui/react-toggle-group` |
| | `@radix-ui/react-tooltip` |
| | `cmdk` |
| | `input-otp` |
| | `vaul` |
| | `embla-carousel-react` |
| | `react-day-picker` |
| | `date-fns` |
| | `@hookform/resolvers` |
| | `react-hook-form` |
| | `zod` |
| | `recharts` |
| | `react-resizable-panels` |
| | `sonner` |
| | `next-themes` |

### 🗑️ Other Dead Files Removed
- `src/App.css` — Vite default template CSS, never applied
- `src/components/NavLink.tsx` — wrapper component, never imported
- `src/hooks/use-toast.ts` — toast hook, nothing called it
- `src/hooks/use-mobile.tsx` — mobile hook, only used by sidebar (which was removed)
- `src/test/` — test setup files (dev-only)
- `src/lib/utils.ts` — cn() utility, nothing actually needed it

### 🗑️ Removed from App.tsx
- `QueryClientProvider` + `@tanstack/react-query` — zero API calls in the app
- `TooltipProvider` — no tooltips rendered
- `Toaster` + `Sonner` — no toasts triggered
- `React.StrictMode` — causes double-renders in dev, irrelevant in prod

---

## What Was Optimized

### ⚡ Code Splitting
- All 7 below-fold sections are `React.lazy()` — load on demand
- `HeroScene` (Three.js WebGL) isolated in its own async chunk
- Pages lazy-loaded via `Suspense`

### 📦 Bundle Results

| Chunk | Before | After |
|---|---|---|
| CSS | **69 kB** | **26 kB** (−62%) |
| ui-radix chunk | 41.9 kB | **0 kB** (eliminated) |
| query chunk | 23.0 kB | **0 kB** (eliminated) |
| router chunk | 15.5 kB | merged into react-vendor |
| Total modules | 1,111 | **1,038** (73 fewer) |

**Initial page load JS** (what loads before any scrolling): `index.html` + `react-vendor` + `lenis` + `Index` chunk + `motion` = roughly **300 kB** before Three.js is needed.

### 🎞️ Animation Performance
- All animations: `transform` + `opacity` only (GPU composited)
- `will-change: transform` on Cursor and Magnetic elements
- Three.js: `dpr: [1, 1.5]`, `antialias: false`, `powerPreference: "high-performance"`
- `MeshTransmissionMaterial` samples: 6 → 4
- All scroll animations: `viewport={{ once: true }}` — stop tracking after fire

### 🌐 Cloudflare Pages
- `public/_redirects`: SPA fallback (`/* /index.html 200`)
- `public/_headers`: 1-year immutable cache on all hashed assets
- `index.html` revalidates on every deploy

### 🔤 Font Loading
- Removed render-blocking CSS `@import`
- Using `media="print" onload="this.media='all'"` trick for non-blocking load
- `<link rel="preconnect">` to Google Fonts domains

---

## Deploy to Cloudflare Pages

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js version | 18+ |

The `_headers` and `_redirects` files in `/public` are picked up automatically.
