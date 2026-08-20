import { PRODUCTS, categoryLabel, type Product } from "./data";

// A "system" groups products that are actually specified and installed
// together as one build-up (a wall, a ceiling, a fire seal) — the way a
// building materials company's real catalog works, as opposed to a flat
// product grid. See docs/research.md §5 on the "system spec" pattern.
export type BuildingSystem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  useCases: string[];
  fireRatingNote?: string;
  // Ordered the way you'd actually build it — substrate/frame first,
  // outward to finish.
  productIds: string[];
};

export const SYSTEMS: BuildingSystem[] = [
  {
    id: "fire-rated-partition-60",
    name: "60-Minute Fire-Rated Partition System",
    tagline:
      "A complete fire-separating stud wall, tested to 60 minutes integrity and insulation as an assembly.",
    description:
      "A metal-stud partition build-up combining a fire-rated board, mineral wool infill, and a fire-rated perimeter seal. Specified where a compartment wall needs to hold back fire and smoke for a defined period — not just individually fire-resistant materials, but a build-up tested together as a system.",
    image: "/images/product-fireboard.png",
    useCases: [
      "Escape corridors and stairwells",
      "Plant rooms and riser cupboards",
      "Compartment walls between tenancies",
    ],
    fireRatingNote:
      "Tested to achieve EI 60 as a complete assembly. Individual component fire ratings do not, on their own, guarantee system performance — the build-up, fixing centres, and perimeter detailing all matter.",
    productIds: [
      "framepro-uw-track-75",
      "framepro-cw-profile-75",
      "coreboard-15-fireline",
      "nordtherm-acoustic-slab-50",
      "firestop-acrylic-sealant",
      "setpro-finishing-plaster-25",
    ],
  },
  {
    id: "acoustic-partition-system",
    name: "Acoustic Partition System",
    tagline:
      "A resilient stud partition for sound-sensitive spaces — offices, meeting rooms, and party walls.",
    description:
      "Decoupling the plasterboard from the stud frame with a resilient bar, and filling the cavity with an acoustic mineral wool slab, meaningfully reduces sound transmission compared to a standard partition. This build-up pairs a sound-rated board with the framing and infill needed to hit a real Rw performance target on site, not just on a data sheet.",
    image: "/images/product-plasterboard.png",
    useCases: [
      "Meeting rooms and private offices",
      "Party walls between residential units",
      "Studios and quiet rooms",
    ],
    productIds: [
      "framepro-uw-track-75",
      "framepro-cw-profile-75",
      "framepro-resilient-bar",
      "nordtherm-acoustic-slab-50",
      "coreboard-125-soundbloc",
      "setpro-finishing-plaster-25",
    ],
  },
  {
    id: "external-wall-insulation-system",
    name: "External Wall Insulation (EWI) System",
    tagline:
      "Insulation, base coat, and finish render as one weatherproof external envelope build-up.",
    description:
      "An external wall insulation system wraps the building envelope in continuous insulation, then protects it with a reinforced base coat and a weatherproof finish render. Specifying these layers as one system — rather than sourcing insulation and render separately — is what keeps warranty and compatibility intact on site.",
    image: "/images/product-insulation.png",
    useCases: [
      "New-build façade insulation",
      "Retrofit / deep-retrofit refurbishment",
      "Thermal upgrade of existing masonry",
    ],
    productIds: [
      "nordtherm-pir-80",
      "setpro-base-coat-25",
      "setpro-finishing-plaster-25",
    ],
  },
  {
    id: "suspended-acoustic-ceiling-system",
    name: "Suspended Acoustic Ceiling System",
    tagline:
      "A demountable acoustic ceiling build-up for open-plan offices and commercial fit-outs.",
    description:
      "Acoustic ceiling tiles combined with insulation above the ceiling void and a resilient mounting detail cut down reverberation and reduce sound transfer between floors — useful anywhere a raw slab-to-slab acoustic path is a problem, particularly open-plan office fit-outs above and below occupied space.",
    image: "/images/product-ceiling.png",
    useCases: [
      "Open-plan office fit-outs",
      "Reception and meeting areas",
      "Retail and hospitality ceilings",
    ],
    productIds: [
      "framepro-resilient-bar",
      "nordtherm-roll-140",
      "acoustic-ceiling-tile-600",
      "acoustic-ceiling-baffle",
    ],
  },
];

export function getSystemById(id: string): BuildingSystem | undefined {
  return SYSTEMS.find((s) => s.id === id);
}

export function getSystemProducts(system: BuildingSystem): Product[] {
  const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
  return system.productIds
    .map((id) => byId.get(id))
    .filter((p): p is Product => p !== undefined);
}

// Distinct component categories in a system, e.g. "Drywall Systems,
// Fire Protection, Insulation" — used as chips on the system card.
export function getSystemCategoryLabels(system: BuildingSystem): string[] {
  const products = getSystemProducts(system);
  const labels = new Set(products.map((p) => categoryLabel(p.category)));
  return Array.from(labels);
}
