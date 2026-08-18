# Requirements Document — Building Materials Digital Experience

**Project working name:** _(placeholder — pick a fictional brand name before implementation, e.g. "Steinbach Materials" or "Nordkern Building Solutions")_
**Status:** Draft, based on `01-research.md`
**Scope:** v1 prototype for take-home assignment — not a production system, but built to production-grade coding standards.

---

## 1. Product vision

A focused, fast, and technically credible web application that lets **architects, contractors, and building professionals** (primary) and **informed homeowners** (secondary) discover building material products, filter them by the criteria that actually drive real specification decisions, and access the detail they need to move forward (technical specs, certifications, documents) — without needing to talk to a sales rep first.

## 2. Target users & primary use cases

| Persona                             | Goal                                                                                                           | Key needs                                                                             |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Architect / Specifier** (primary) | Find a product that meets a technical requirement (e.g., fire rating, thermal performance) for a spec document | Precise filtering, comparable technical data, certifications, downloadable spec sheet |
| **Contractor** (primary)            | Find the right product fast, understand how to install/apply it                                                | Clear categories, application info, quick spec access                                 |
| **Homeowner / DIY** (secondary)     | Understand what a product is and whether it fits their project                                                 | Plain-language descriptions, images, approximate use cases                            |

We optimize v1 primarily for the **Architect/Specifier** and **Contractor** personas, since they represent the core commercial value of a building materials company's digital presence (see research §2–3), while keeping language accessible enough not to alienate the secondary persona.

## 3. In-scope features (v1)

### 3.1 Product listing (must-have)

- Grid/list of products with: image, name, category, short description, 2–3 key specs (e.g., fire rating, R-value), CTA to detail page.
- Pagination or infinite scroll (pagination preferred for predictability and accessibility).
- Result count ("24 products found").

### 3.2 Search (must-have)

- Free-text search across product name, category, description, and key attributes.
- Debounced input, clear "×" to reset.
- Handles zero-result state gracefully with a suggestion to broaden the search.

### 3.3 Filtering (must-have)

Filters should map to the real evaluation criteria identified in research (§2–4), not generic e-commerce facets:

- **Category** (simplified CSI-inspired taxonomy — see research §3): Insulation & Thermal, Drywall & Finishes, Flooring & Tiling, Concrete & Masonry, Roofing & Waterproofing, Doors, Windows & Openings.
- **Application area**: Interior / Exterior / Both.
- **Fire rating** (e.g., A1, A2, B, C — simplified Euroclass-style scale).
- **Sustainability documentation**: has EPD / has HPD (boolean filters).
- **Price range** (indicative, since B2B pricing is normally quote-based — labeled clearly as "indicative").
- Multi-select filters, with an active-filter chip row and a one-click "Clear all."
- Filters must compose with search (AND logic) and update the result count live.

### 3.4 Product detail page (must-have)

Structured per research §4, sections:

1. **Overview** — name, category, hero image(s), short description.
2. **Technical specifications** — structured key/value table (dimensions, weight, thermal/acoustic values, fire rating, load rating as applicable per category).
3. **Application & installation** — plain-language guidance, ideal use cases.
4. **Compliance & sustainability** — certifications, EPD/HPD indicators (with an explanation tooltip, since these are unfamiliar acronyms to non-specialist users).
5. **Documents** — downloadable spec sheet (can be a static placeholder PDF or disabled state clearly marked "coming soon" — explicitly note this trade-off in the README rather than faking a broken link).
6. **Related products** (nice-to-have, see §4).

### 3.5 Non-functional requirements (must-have)

- **Empty states**: no products, no search results, no filter results — each with distinct, actionable copy.
- **Loading states**: skeleton loaders for listing and detail views, not blank screens/spinners-only.
- **Error states**: failed data fetch shows a retry action, not a raw error or blank page.
- **Invalid input handling**: search/filter inputs are sanitized and never crash the UI on unexpected input (e.g., only symbols, extremely long strings).
- **Responsive design**: functional and visually coherent from ~360px mobile width up to desktop; filter panel collapses to a drawer/sheet on mobile.
- **Accessibility**: WCAG 2.1 AA baseline — keyboard navigation, visible focus states, semantic landmarks, labeled form controls, sufficient contrast, alt text.
- **Maintainability**: typed codebase, component-driven UI, clearly separated data layer (so a mock JSON source could later be swapped for a real API/CMS with minimal changes), README documenting setup and decisions.

## 4. Nice-to-have / stretch (only if time allows, explicitly lower priority)

- Product comparison (select 2–3 products, view specs side by side) — high relevance to the specifier persona per research §5, but adds real complexity; flagged as the top stretch goal if time permits.
- Sort (relevance, name, price).
- "Related products" / product-system grouping (e.g., insulation + matching fasteners), inspired by research §5's "system spec" pattern — likely stubbed rather than fully modeled in v1.
- Dark/light theme toggle.
- Basic unit tests for filter/search logic.

## 5. Explicitly out of scope for v1 (and why)

- **User accounts, quoting, cart/checkout** — this is a discovery tool, not a commerce flow; building materials are quoted/sold through reps and distributors, not typically bought online at this stage of the funnel.
- **Full 50-division CSI taxonomy** — overkill for a prototype aimed at general usability; a simplified 7-category subset is used instead (research §3).
- **Real manufacturer data / scraping** — avoided for legal/IP reasons; fictional dataset used instead (research §7).
- **CMS/admin backend for editing products** — a static/mock JSON data source is sufficient to demonstrate the frontend and data-layer architecture; noted as a natural "next step" in the README.
- **Multi-language / i18n** — noted as a real-world requirement for a company like this (likely operating in DACH/EU), but out of scope for v1 given time constraints; architecture should not actively prevent adding it later (i.e., avoid hardcoding user-facing strings deep in logic).

## 6. Data model (draft)

```
Product {
  id: string
  name: string
  category: CategoryEnum
  applicationArea: "interior" | "exterior" | "both"
  shortDescription: string
  longDescription: string
  images: string[]
  specs: { label: string, value: string, unit?: string }[]
  fireRating?: string
  hasEPD: boolean
  hasHPD: boolean
  indicativePriceRange?: { min: number, max: number, currency: string }
  specSheetUrl?: string
  relatedProductIds?: string[]
}
```

## 7. Technology direction (to be finalized in the technical plan)

- Given Pratik's existing stack (React/Next.js + TypeScript, Tailwind, PostgreSQL/Prisma where a backend is warranted), a **Next.js + TypeScript + Tailwind** frontend with a **local JSON / mock API route** (no external DB required to run) is the pragmatic choice: it demonstrates modern full-stack proficiency without over-engineering a backend the assignment doesn't require.
- A lightweight backend (e.g., a simple Next.js API route or a small Express/Fastify service) is enough to justify "full stack" in the role title, while keeping infra/setup friction near zero for whoever reviews the repo.
- Final technical architecture, folder structure, and component plan to be written as a separate `03-technical-plan.md` before implementation begins.

## 8. Success criteria for v1

- A reviewer can clone the repo, run one command, and use the app within minutes with no explanation.
- All four required user actions (list, search, filter, view detail) work end-to-end with realistic data.
- Empty, loading, and error states are visibly handled, not theoretical.
- The app is usable on a phone-sized viewport and via keyboard-only navigation.
- The README clearly documents scope decisions, trade-offs, and what was intentionally left out — matching the assignment's explicit ask for reasoning, not just code.
