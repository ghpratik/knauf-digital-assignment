# Nordkern - Building Materials Digital Experience

A prototype web application for discovering building material products, built for the Working Student — Full Stack Developer take-home assignment.

**Live scope:** browse, search, and filter a catalog of building products; open a product to see structured technical specs, compliance/sustainability info, installation guidance, and related products.

> **Brand note:** "Nordkern" is a fictional brand created for this prototype. Product data is fictional but modeled on real categories, terminology, and evaluation criteria used in the building materials industry (see [Data and sources](#data-and-sources)).

---

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs against a local mock data layer. Browsing, searching, filtering, and comparison do not require external services; request-quote email confirmation requires a `RESEND_API_KEY` in the environment.

```bash
pnpm build   # production build
pnpm lint    # eslint
pnpm test    # unit tests
```

---

## Investigation

Before writing any code, I researched how building-material products are actually organized, searched, and specified, and who the real users are. That research lives in [`docs/research.md`](./docs/research.md) and covers:

- User needs across architects/specifiers, contractors, distributors, and homeowners
- How existing platforms (ARCAT, Causeway SpecifiedBy, 4specs, manufacturer sites) structure product discovery
- CSI MasterFormat-style categorization, and why a simplified subset is more appropriate for a prototype than the full 50-division taxonomy
- What EPDs and HPDs are, and why they matter as filter criteria rather than decorative badges
- Accessibility and responsive-design considerations specific to technical, data-dense product pages

The requirements derived from that research are in [`docs/requiredments.md`](./docs/requiredments.md). This README documents what was actually built against those requirements, and where the implementation diverges.

---

## What's implemented

### Product listing (`/products`)

- Grid of product cards: image, name, category, 2–3 key specs, CTA to detail page
- Live result count, pagination (9 per page)
- Skeleton loaders while data is in flight, a distinct error state with retry on fetch failure, and a distinct empty state when filters/search return nothing

### Search

- Debounced free-text search (350ms) across name, category, and description
- Clears independently of filters; combines with filters using AND logic

### Filtering

- Category (six categories, closer to Knauf's real product families — plasterboard, insulation, drywall systems, ceilings, fire protection, plasters — rather than the more generic seven-category taxonomy sketched in the original requirements doc; see [Deviations](#deviations-from-the-original-requirements-doc))
- Application area (interior / exterior / both)
- Fire rating (Euroclass-style: A1, A2, B, C, None)
- Sustainability documentation (EPD / HPD, boolean toggles)
- Indicative price range (min/max), labeled as indicative since real B2B pricing is quote-based
- Sort (relevance, name, price)
- All filters are reflected in the URL (`useSearchParams`), so filtered views are shareable and back/forward-navigable. Active-filter chips with per-filter and "clear all" removal.

### Product detail (`/products/[id]`)

- Overview: hero image, category, name, short description
- Technical specifications as a structured key/value table
- Applications & installation guidance in plain language
- Compliance & sustainability: EPD/HPD/fire certification/CE marking status, plus a short sustainability summary
- Documents: spec sheet download entries
- Related products, sourced from the product's category

### Product comparison (`/products/compare`)

- Select two or three products from the catalogue
- Compare key product information and technical specifications side by side
- Access comparison from product cards and product detail pages

### Request quote

- Submit an email address and optional project message from a product detail page
- Validate the product and email before sending
- Send a dummy confirmation email through Resend when `RESEND_API_KEY` is configured
- Show sending, success, and error states in the dialog

### Non-functional requirements

- **Loading:** skeleton grids on the listing page, not spinners or blank screens
- **Error:** failed fetches show a retry action rather than a raw error
- **Empty states:** distinct copy for "no products" vs "no results for this search/filter combination," with a suggestion to broaden the search
- **Responsive:** functional from ~360px up; filter panel collapses to a mobile-friendly layout
- **Accessibility:** semantic landmarks, labeled form controls, breadcrumb navigation with `aria-label`, `sr-only` headings where visual hierarchy and semantic hierarchy diverge, focus-visible states from the shadcn/base-ui primitives used throughout
- **Maintainability:** fully typed (TypeScript), the product catalog is a single typed module (`lib/products.ts`) behind API routes (`app/api/products`), so swapping the mock data for a real API/CMS later only touches that layer, not the UI

---

## Known trade-offs and things left deliberately unfinished

Being upfront about these, per the assignment's ask for reasoning over polish:

- **Document downloads use placeholder PDFs.** The document links are functional and point to local files in `public/docs`, but the PDFs are demonstration assets rather than official manufacturer documentation.
- **"Request quote" sends a dummy confirmation email.** It demonstrates the request flow through the API and Resend, but it is not connected to a sales or CRM workflow. Configure `RESEND_API_KEY` to exercise it.
- **Unit tests:** Vitest covers the product query layer, search/filter/sort/pagination behavior, comparison helpers, product and comparison API routes, and request-quote validation/email outcomes. Browser-level interaction tests are still out of scope.
- **No dark/light theme toggle.** Deprioritized in favor of the above.

---

## Out of scope (and why)

- **User accounts, quoting, cart/checkout.** Building materials at this scale are quoted and sold through reps/distributors, not bought online — a "request info" CTA is the realistic endpoint for this kind of tool, not checkout.
- **Full CSI MasterFormat taxonomy (50 divisions).** Overkill for a prototype; a simplified category set covers the real evaluation criteria without forcing users through an enterprise-scale classification system.
- **Real manufacturer data.** Avoided for IP/legal reasons. All product data is fictional, though modeled on real specs and terminology (see below).
- **CMS/admin backend.** A typed mock data layer behind API routes is enough to demonstrate the frontend and data architecture; a CMS is a reasonable "next step," not something this prototype needed to prove.
- **Multi-language / i18n.** A real requirement for a company operating in DACH/EU, but out of scope here given time constraints. User-facing strings aren't buried in logic, so adding i18n later wouldn't require restructuring.

---

## Data and sources

All product data (names, specs, images, pricing) is fictional and was created specifically for this prototype — no manufacturer data was scraped or copied.

The _structure_ of the data — which fields matter, how fire ratings and EPDs are represented, what a spec table should contain — is informed by public industry resources consulted during research, listed in full in [`docs/research.md`](./docs/research.md), including ARCAT, Causeway SpecifiedBy, 4specs, Autodesk's CSI Divisions reference, and manufacturer sustainability documentation on EPDs/HPDs.

---

## Deviations from the original requirements doc

The early requirements doc (`docs/requiredments.md`) sketched a generic seven-category taxonomy (Insulation & Thermal, Drywall & Finishes, Flooring & Tiling, Concrete & Masonry, Roofing & Waterproofing, Doors/Windows) for a fictional generic brand. During implementation, the category set was narrowed to six categories that map more closely to a real drywall/insulation/interior-systems manufacturer (plasterboard, insulation, drywall systems, ceilings, fire protection, plasters), which produced more coherent, comparable spec tables per category than a broader, shallower taxonomy would have.

## What's next

If continuing this prototype, in priority order:

1. Connect request-quote submissions to a real sales or CRM workflow
2. A "systems" view grouping related products (e.g., a fire-rated partition = plasterboard + insulation + studs), reflecting how these products are actually specified together rather than individually
3. Unit tests around filter/search and comparison logic
4. Sort persistence refinements and dark/light theme toggle
