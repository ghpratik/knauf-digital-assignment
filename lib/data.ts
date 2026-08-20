export type CategorySlug =
  | "plasterboard"
  | "insulation"
  | "drywall-systems"
  | "ceilings"
  | "fire-protection"
  | "plasters";

export type FireRating = "A1" | "A2" | "B" | "C" | "None";

export type SpecRow = { label: string; value: string };

export type ProductDocument = {
  name: string;
  type: string;
  size: string;
};

export type Product = {
  id: string;
  name: string;
  category: CategorySlug;
  applicationAreas: string[];
  fireRating: FireRating;
  rValue: number | null;
  price: number;
  unit: string;
  image: string;
  tag: string | null;
  shortDescription: string;
  overview: string;
  specifications: SpecRow[];
  applications: string[];
  compliance: {
    epd: boolean;
    hpd: boolean;
    fireCertification: boolean;
    ceMarked: boolean;
  };
  sustainability: string[];
  documents: ProductDocument[];
};

// Card projection — only the fields the listing/grid needs.
export type ProductCard = Pick<
  Product,
  | "id"
  | "name"
  | "category"
  | "fireRating"
  | "rValue"
  | "price"
  | "unit"
  | "image"
  | "tag"
  | "shortDescription"
> & { categoryLabel: string; applicationAreas: string[] };

export const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: "plasterboard", label: "Plasterboard" },
  { slug: "insulation", label: "Insulation & Thermal" },
  { slug: "drywall-systems", label: "Drywall Systems" },
  { slug: "ceilings", label: "Ceilings" },
  { slug: "fire-protection", label: "Fire Protection" },
  { slug: "plasters", label: "Plasters & Finishes" },
];

export const APPLICATION_AREAS = [
  "Interior walls",
  "Exterior walls",
  "Partitions",
  "Ceilings",
  "Floors",
  "Roofs",
  "Wet areas",
  "Facades",
];

export const FIRE_RATINGS: FireRating[] = ["A1", "A2", "B", "C", "None"];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A to Z" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export function categoryLabel(slug: CategorySlug): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

const img = {
  plasterboard: "/images/product-plasterboard.png",
  insulation: "/images/product-insulation.png",
  plaster: "/images/product-plaster.png",
  ceiling: "/images/product-ceiling.png",
  screed: "/images/product-screed.png",
  fireboard: "/images/product-fireboard.png",
  profile: "/images/product-profile.png",
};

const makeProduct = (
  id: string,
  name: string,
  category: CategorySlug,
  image: string,
  price: number,
  unit: string,
  shortDescription: string,
  applicationAreas: string[],
  fireRating: FireRating = "A2",
  rValue: number | null = null,
  tag: string | null = null,
): Product => ({
  id,
  name,
  category,
  applicationAreas,
  fireRating,
  rValue,
  price,
  unit,
  image,
  tag,
  shortDescription,
  overview: `${name} is a dependable Nordkern building material engineered for consistent performance across demanding construction projects.`,
  specifications: [
    { label: "Product category", value: categoryLabel(category) },
    { label: "Fire rating", value: fireRating },
    ...(rValue ? [{ label: "Thermal resistance", value: `R ${rValue} m²K/W` }] : []),
    { label: "Typical use", value: applicationAreas[0] ?? "General construction" },
  ],
  applications: applicationAreas,
  compliance: { epd: true, hpd: false, fireCertification: fireRating !== "None", ceMarked: true },
  sustainability: ["Designed for long service life", "Recyclable packaging", "Responsible material selection"],
  documents: [{ name: "Specification sheet", type: "PDF", size: "420 KB" }],
});

export const PRODUCTS: Product[] = [
  {
    id: "coreboard-125-standard",
    name: "CoreBoard 12.5 Standard",
    category: "plasterboard",
    applicationAreas: ["Interior walls", "Partitions", "Ceilings"],
    fireRating: "A2",
    rValue: null,
    price: 8.4,
    unit: "per sheet",
    image: img.plasterboard,
    tag: "Best seller",
    shortDescription:
      "General-purpose 12.5 mm gypsum board for interior walls and ceilings.",
    overview:
      "CoreBoard 12.5 Standard is our everyday tapered-edge plasterboard for lining interior walls, partitions and ceilings. The dense gypsum core is faced with recycled liner paper for a smooth, ready-to-finish surface that takes plaster, tape and jointing compound cleanly.",
    specifications: [
      { label: "Thickness", value: "12.5 mm" },
      { label: "Board size", value: "1200 × 2400 mm" },
      { label: "Fire rating", value: "A2-s1, d0" },
      { label: "Weight", value: "8.5 kg/m²" },
      { label: "Edge profile", value: "Tapered" },
      { label: "Thermal conductivity", value: "0.25 W/mK" },
    ],
    applications: [
      "Interior partition walls",
      "Wall linings on metal or timber frame",
      "Suspended and direct-fix ceilings",
    ],
    compliance: {
      epd: true,
      hpd: true,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Manufactured with up to 96% recycled gypsum",
      "Recyclable at end of life",
      "Low-VOC certified for indoor air quality",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "420 KB" },
      { name: "Declaration of performance", type: "PDF", size: "180 KB" },
      {
        name: "Environmental product declaration",
        type: "PDF",
        size: "1.2 MB",
      },
    ],
  },
  {
    id: "coreboard-15-fireline",
    name: "CoreBoard 15 FireLine",
    category: "fire-protection",
    applicationAreas: ["Partitions", "Ceilings", "Interior walls"],
    fireRating: "A1",
    rValue: null,
    price: 13.9,
    unit: "per sheet",
    image: img.fireboard,
    tag: null,
    shortDescription:
      "15 mm fire-resistant board with glass-fibre reinforced core.",
    overview:
      "CoreBoard 15 FireLine is a high-performance fire board with a glass-fibre reinforced gypsum core, engineered for fire-rated partitions, shaft walls and protected escape routes. It delivers up to 120 minutes of fire resistance in tested system build-ups.",
    specifications: [
      { label: "Thickness", value: "15 mm" },
      { label: "Board size", value: "1200 × 2400 mm" },
      { label: "Fire rating", value: "A1" },
      { label: "Fire resistance", value: "Up to EI 120" },
      { label: "Weight", value: "12.2 kg/m²" },
      { label: "Edge profile", value: "Tapered" },
    ],
    applications: [
      "Fire-rated partition systems",
      "Steel column and beam encasement",
      "Protected escape corridors",
    ],
    compliance: {
      epd: true,
      hpd: true,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Non-combustible A1 classification",
      "Recyclable gypsum core",
      "Third-party fire certification",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "460 KB" },
      { name: "Fire test certificate", type: "PDF", size: "2.1 MB" },
      { name: "Installation guide", type: "PDF", size: "980 KB" },
    ],
  },
  {
    id: "coreboard-125-moistureguard",
    name: "CoreBoard 12.5 MoistureGuard",
    category: "plasterboard",
    applicationAreas: ["Wet areas", "Interior walls", "Partitions"],
    fireRating: "A2",
    rValue: null,
    price: 11.2,
    unit: "per sheet",
    image: img.plasterboard,
    tag: null,
    shortDescription:
      "Water-repellent plasterboard for bathrooms, kitchens and utility rooms.",
    overview:
      "CoreBoard 12.5 MoistureGuard has a silicone-treated core and water-repellent liner, making it suitable for intermittently humid rooms such as bathrooms, kitchens and utility areas before tiling or finishing.",
    specifications: [
      { label: "Thickness", value: "12.5 mm" },
      { label: "Board size", value: "1200 × 2400 mm" },
      { label: "Fire rating", value: "A2-s1, d0" },
      { label: "Water absorption", value: "< 5%" },
      { label: "Weight", value: "9.1 kg/m²" },
      { label: "Edge profile", value: "Tapered" },
    ],
    applications: [
      "Bathroom and shower wall linings",
      "Kitchen and utility partitions",
      "Substrate for tiling in wet rooms",
    ],
    compliance: {
      epd: true,
      hpd: false,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Recyclable gypsum core",
      "Low-VOC certified",
      "Reduced water waste in production",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "440 KB" },
      { name: "Declaration of performance", type: "PDF", size: "190 KB" },
    ],
  },
  {
    id: "nordtherm-wall-100",
    name: "NordTherm Wall 100",
    category: "insulation",
    applicationAreas: ["Exterior walls", "Partitions", "Facades"],
    fireRating: "A1",
    rValue: 2.7,
    price: 24.9,
    unit: "per roll",
    image: img.insulation,
    tag: "Best seller",
    shortDescription:
      "100 mm mineral wool slab for high-performance wall insulation.",
    overview:
      "NordTherm Wall 100 is a semi-rigid stone wool slab providing excellent thermal and acoustic performance for external and internal wall build-ups. Non-combustible and dimensionally stable, it friction-fits between studs without slumping.",
    specifications: [
      { label: "Thickness", value: "100 mm" },
      { label: "Fire rating", value: "A1" },
      { label: "Thermal resistance (R)", value: "2.70 m²K/W" },
      { label: "Thermal conductivity", value: "0.037 W/mK" },
      { label: "Acoustic", value: "Rw up to 45 dB (system)" },
      { label: "Density", value: "40 kg/m³" },
    ],
    applications: [
      "Timber and steel frame external walls",
      "Internal separating walls",
      "Rainscreen facade cavities",
    ],
    compliance: {
      epd: true,
      hpd: true,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Made from naturally abundant volcanic rock",
      "Up to 70% recycled content",
      "Fully recyclable",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "510 KB" },
      {
        name: "Environmental product declaration",
        type: "PDF",
        size: "1.4 MB",
      },
      { name: "Health product declaration", type: "PDF", size: "760 KB" },
    ],
  },
  {
    id: "nordtherm-roll-140",
    name: "NordTherm Roll 140",
    category: "insulation",
    applicationAreas: ["Roofs", "Ceilings", "Floors"],
    fireRating: "A1",
    rValue: 3.8,
    price: 29.5,
    unit: "per roll",
    image: img.insulation,
    tag: null,
    shortDescription:
      "140 mm glass mineral wool roll for lofts and cold roofs.",
    overview:
      "NordTherm Roll 140 is a lightweight glass mineral wool roll designed for laying between and over ceiling joists in cold-roof loft applications. It combines a high thermal resistance with easy handling and tear-to-width installation.",
    specifications: [
      { label: "Thickness", value: "140 mm" },
      { label: "Fire rating", value: "A1" },
      { label: "Thermal resistance (R)", value: "3.80 m²K/W" },
      { label: "Thermal conductivity", value: "0.037 W/mK" },
      { label: "Coverage", value: "5.8 m² per roll" },
      { label: "Density", value: "12 kg/m³" },
    ],
    applications: [
      "Loft insulation between joists",
      "Cold-roof ceiling build-ups",
      "Intermediate floor sound insulation",
    ],
    compliance: {
      epd: true,
      hpd: true,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Up to 80% recycled glass content",
      "Compression-packed to cut transport emissions",
      "Recyclable",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "480 KB" },
      {
        name: "Environmental product declaration",
        type: "PDF",
        size: "1.3 MB",
      },
    ],
  },
  {
    id: "nordtherm-pir-80",
    name: "NordTherm PIR 80",
    category: "insulation",
    applicationAreas: ["Floors", "Roofs", "Exterior walls"],
    fireRating: "B",
    rValue: 3.6,
    price: 34.0,
    unit: "per board",
    image: img.insulation,
    tag: "New",
    shortDescription:
      "80 mm rigid PIR board with a high R-value for slim build-ups.",
    overview:
      "NordTherm PIR 80 is a rigid polyisocyanurate insulation board with foil facings, delivering a very high thermal resistance in a thin profile. Ideal where space is constrained, such as floors, flat roofs and insulated dry-lining.",
    specifications: [
      { label: "Thickness", value: "80 mm" },
      { label: "Fire rating", value: "B-s1, d0" },
      { label: "Thermal resistance (R)", value: "3.63 m²K/W" },
      { label: "Thermal conductivity", value: "0.022 W/mK" },
      { label: "Board size", value: "1200 × 2400 mm" },
      { label: "Compressive strength", value: "≥ 120 kPa" },
    ],
    applications: [
      "Insulated ground and intermediate floors",
      "Flat and pitched roof insulation",
      "Insulated plasterboard laminate walls",
    ],
    compliance: {
      epd: true,
      hpd: false,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Zero ozone depletion potential blowing agent",
      "Long service life reduces replacement",
      "Recyclable facings",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "520 KB" },
      { name: "Declaration of performance", type: "PDF", size: "210 KB" },
    ],
  },
  {
    id: "setpro-finishing-plaster-25",
    name: "SetPro Finishing Plaster 25kg",
    category: "plasters",
    applicationAreas: ["Interior walls", "Ceilings"],
    fireRating: "A1",
    rValue: null,
    price: 12.1,
    unit: "per bag",
    image: img.plaster,
    tag: null,
    shortDescription:
      "Smooth-set gypsum finishing plaster for a polished interior finish.",
    overview:
      "SetPro Finishing Plaster is a premium gypsum topcoat plaster that trowels to a smooth, hard-wearing surface ready for decoration. Excellent workability and a long working window make it forgiving for both hand and spray application.",
    specifications: [
      { label: "Weight", value: "25 kg bag" },
      { label: "Fire rating", value: "A1" },
      { label: "Coverage", value: "≈ 10 m² at 2 mm" },
      { label: "Setting time", value: "90–120 min" },
      { label: "Layer thickness", value: "2–3 mm" },
      { label: "Application", value: "Hand or spray" },
    ],
    applications: [
      "Skim finish over plasterboard",
      "Finishing coat over base plasters",
      "Interior wall and ceiling refurbishment",
    ],
    compliance: {
      epd: true,
      hpd: false,
      fireCertification: false,
      ceMarked: true,
    },
    sustainability: [
      "Natural gypsum binder",
      "Recyclable paper packaging",
      "Low dust formulation",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "380 KB" },
      { name: "Safety data sheet", type: "PDF", size: "240 KB" },
    ],
  },
  {
    id: "setpro-base-coat-25",
    name: "SetPro Base Coat 25kg",
    category: "plasters",
    applicationAreas: ["Interior walls", "Partitions"],
    fireRating: "A1",
    rValue: null,
    price: 10.8,
    unit: "per bag",
    image: img.plaster,
    tag: null,
    shortDescription:
      "Lightweight undercoat plaster for building out and leveling walls.",
    overview:
      "SetPro Base Coat is a lightweight, high-coverage backing plaster for building out uneven masonry and blockwork before a finishing coat. Its lightweight aggregate reduces bag weight and improves on-wall yield.",
    specifications: [
      { label: "Weight", value: "25 kg bag" },
      { label: "Fire rating", value: "A1" },
      { label: "Coverage", value: "≈ 3 m² at 11 mm" },
      { label: "Setting time", value: "100–140 min" },
      { label: "Layer thickness", value: "8–13 mm" },
      { label: "Substrate", value: "Masonry, block, brick" },
    ],
    applications: [
      "Undercoat on masonry walls",
      "Leveling before finish plaster",
      "Refurbishment of solid walls",
    ],
    compliance: {
      epd: true,
      hpd: false,
      fireCertification: false,
      ceMarked: true,
    },
    sustainability: [
      "Lightweight aggregate lowers transport load",
      "Natural gypsum binder",
      "Recyclable packaging",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "360 KB" },
      { name: "Safety data sheet", type: "PDF", size: "230 KB" },
    ],
  },
  {
    id: "acoustic-ceiling-tile-600",
    name: "Acoustic Ceiling Tile 600×600",
    category: "ceilings",
    applicationAreas: ["Ceilings"],
    fireRating: "A1",
    rValue: null,
    price: 6.75,
    unit: "per tile",
    image: img.ceiling,
    tag: "New",
    shortDescription:
      "Mineral fibre suspended ceiling tile with strong sound absorption.",
    overview:
      "This 600 × 600 mm mineral fibre ceiling tile drops into a standard 24 mm exposed grid, offering excellent sound absorption and a clean matt white finish for offices, education and healthcare interiors.",
    specifications: [
      { label: "Tile size", value: "600 × 600 mm" },
      { label: "Fire rating", value: "A1" },
      { label: "Sound absorption", value: "αw 0.90" },
      { label: "Light reflectance", value: "87%" },
      { label: "Grid", value: "24 mm exposed T-grid" },
      { label: "Humidity resistance", value: "Up to 95% RH" },
    ],
    applications: [
      "Suspended office ceilings",
      "Education and healthcare interiors",
      "Retail and reception spaces",
    ],
    compliance: {
      epd: true,
      hpd: true,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Contains recycled mineral fibre",
      "Take-back recycling scheme available",
      "Improves acoustic comfort",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "410 KB" },
      { name: "Acoustic test report", type: "PDF", size: "1.1 MB" },
    ],
  },
  {
    id: "acoustic-ceiling-baffle",
    name: "Acoustic Ceiling Baffle",
    category: "ceilings",
    applicationAreas: ["Ceilings"],
    fireRating: "A2",
    rValue: null,
    price: 42.0,
    unit: "per baffle",
    image: img.ceiling,
    tag: null,
    shortDescription:
      "Vertical suspended baffle for open-plan acoustic control.",
    overview:
      "The Acoustic Ceiling Baffle is a vertically suspended sound-absorbing element for open-plan spaces with exposed services. Suspended on adjustable wires, baffles tune reverberation while leaving the soffit visible.",
    specifications: [
      { label: "Panel size", value: "1200 × 300 mm" },
      { label: "Fire rating", value: "A2-s1, d0" },
      { label: "Sound absorption", value: "Class A" },
      { label: "Thickness", value: "40 mm" },
      { label: "Suspension", value: "Adjustable wire" },
      { label: "Finish", value: "Acoustic fleece" },
    ],
    applications: [
      "Open-plan offices with exposed soffits",
      "Atria and breakout spaces",
      "Restaurants and cafeterias",
    ],
    compliance: {
      epd: true,
      hpd: false,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Recycled core content",
      "Demountable and reusable",
      "Improves speech clarity",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "430 KB" },
      { name: "Acoustic test report", type: "PDF", size: "1.0 MB" },
    ],
  },
  {
    id: "framepro-cw-profile-75",
    name: "FramePro CW Profile 75",
    category: "drywall-systems",
    applicationAreas: ["Partitions", "Interior walls"],
    fireRating: "A1",
    rValue: null,
    price: 4.6,
    unit: "per length",
    image: img.profile,
    tag: null,
    shortDescription:
      "75 mm galvanized C-stud for metal-frame partition systems.",
    overview:
      "FramePro CW 75 is a galvanized steel C-stud that forms the vertical framing of partition and wall-lining systems. Knurled faces improve screw retention and pre-punched service holes speed up first-fix routing.",
    specifications: [
      { label: "Profile width", value: "75 mm" },
      { label: "Length", value: "3000 mm" },
      { label: "Fire rating", value: "A1" },
      { label: "Steel gauge", value: "0.6 mm" },
      { label: "Coating", value: "Z275 galvanized" },
      { label: "Service holes", value: "Pre-punched" },
    ],
    applications: [
      "Metal stud partition framing",
      "Wall-lining sub-frames",
      "Shaft wall systems",
    ],
    compliance: {
      epd: true,
      hpd: false,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Steel is fully recyclable",
      "High recycled steel content",
      "Long service life",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "350 KB" },
      { name: "Declaration of performance", type: "PDF", size: "170 KB" },
    ],
  },
  {
    id: "framepro-uw-track-75",
    name: "FramePro UW Track 75",
    category: "drywall-systems",
    applicationAreas: ["Partitions", "Interior walls"],
    fireRating: "A1",
    rValue: null,
    price: 3.9,
    unit: "per length",
    image: img.profile,
    tag: null,
    shortDescription:
      "75 mm floor and head track to pair with FramePro C-studs.",
    overview:
      "FramePro UW 75 is the U-shaped perimeter track fixed to floor and soffit to locate FramePro C-studs. Together they form the structural skeleton of a partition before boarding.",
    specifications: [
      { label: "Profile width", value: "75 mm" },
      { label: "Length", value: "3000 mm" },
      { label: "Fire rating", value: "A1" },
      { label: "Steel gauge", value: "0.6 mm" },
      { label: "Coating", value: "Z275 galvanized" },
      { label: "Flange depth", value: "40 mm" },
    ],
    applications: [
      "Floor and head tracks for partitions",
      "Perimeter framing for wall linings",
      "Deflection head details",
    ],
    compliance: {
      epd: true,
      hpd: false,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Fully recyclable steel",
      "High recycled content",
      "Durable galvanized coating",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "340 KB" },
      { name: "Declaration of performance", type: "PDF", size: "160 KB" },
    ],
  },
  {
    id: "levelflow-screed-25",
    name: "LevelFlow Screed 25kg",
    category: "plasters",
    applicationAreas: ["Floors"],
    fireRating: "A1",
    rValue: null,
    price: 15.4,
    unit: "per bag",
    image: img.screed,
    tag: null,
    shortDescription:
      "Self-leveling floor compound for a smooth substrate before flooring.",
    overview:
      "LevelFlow Screed is a self-smoothing, pumpable floor compound that flattens subfloors from 2 to 30 mm before the installation of resilient, tile or timber floor finishes. Rapid strength gain allows early foot traffic.",
    specifications: [
      { label: "Weight", value: "25 kg bag" },
      { label: "Fire rating", value: "A1" },
      { label: "Layer thickness", value: "2–30 mm" },
      { label: "Walk-on time", value: "3–4 hours" },
      { label: "Coverage", value: "≈ 1.5 m² at 10 mm" },
      { label: "Compressive strength", value: "C25" },
    ],
    applications: [
      "Leveling concrete and screed subfloors",
      "Preparation before tiling or vinyl",
      "Underfloor heating overlay",
    ],
    compliance: {
      epd: true,
      hpd: false,
      fireCertification: false,
      ceMarked: true,
    },
    sustainability: [
      "Low-dust pouring formulation",
      "Recyclable packaging",
      "Reduced cement content binder",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "390 KB" },
      { name: "Safety data sheet", type: "PDF", size: "250 KB" },
    ],
  },
  {
    id: "coreboard-125-soundbloc",
    name: "CoreBoard 12.5 SoundBloc",
    category: "plasterboard",
    applicationAreas: ["Partitions", "Interior walls", "Ceilings"],
    fireRating: "A2",
    rValue: null,
    price: 12.6,
    unit: "per sheet",
    image: img.plasterboard,
    tag: null,
    shortDescription:
      "High-density acoustic plasterboard for sound-rated partitions.",
    overview:
      "CoreBoard 12.5 SoundBloc uses a denser gypsum core to improve airborne sound insulation in separating walls and floors. It installs like standard board but lifts system acoustic performance significantly.",
    specifications: [
      { label: "Thickness", value: "12.5 mm" },
      { label: "Board size", value: "1200 × 2400 mm" },
      { label: "Fire rating", value: "A2-s1, d0" },
      { label: "Weight", value: "10.9 kg/m²" },
      { label: "Acoustic", value: "Rw up to 54 dB (system)" },
      { label: "Edge profile", value: "Tapered" },
    ],
    applications: [
      "Acoustic separating partitions",
      "Party wall linings",
      "Home cinema and studio walls",
    ],
    compliance: {
      epd: true,
      hpd: true,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Recycled gypsum core",
      "Recyclable at end of life",
      "Low-VOC certified",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "450 KB" },
      { name: "Acoustic test report", type: "PDF", size: "1.2 MB" },
    ],
  },
  {
    id: "nordtherm-acoustic-slab-50",
    name: "NordTherm Acoustic Slab 50",
    category: "insulation",
    applicationAreas: ["Partitions", "Ceilings", "Floors"],
    fireRating: "A1",
    rValue: 1.35,
    price: 16.8,
    unit: "per pack",
    image: img.insulation,
    tag: null,
    shortDescription:
      "50 mm acoustic stone wool slab for partition sound infill.",
    overview:
      "NordTherm Acoustic Slab 50 is a dense stone wool infill slab used inside metal and timber partitions to absorb sound within the cavity and boost the system's acoustic rating. Non-combustible and easy to friction-fit.",
    specifications: [
      { label: "Thickness", value: "50 mm" },
      { label: "Fire rating", value: "A1" },
      { label: "Thermal resistance (R)", value: "1.35 m²K/W" },
      { label: "Density", value: "45 kg/m³" },
      { label: "Coverage", value: "5.4 m² per pack" },
      { label: "Airflow resistivity", value: "High" },
    ],
    applications: [
      "Partition cavity acoustic infill",
      "Floor and ceiling sound insulation",
      "Service riser lining",
    ],
    compliance: {
      epd: true,
      hpd: true,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "High recycled stone wool content",
      "Fully recyclable",
      "Non-combustible A1",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "470 KB" },
      {
        name: "Environmental product declaration",
        type: "PDF",
        size: "1.3 MB",
      },
    ],
  },
  {
    id: "coreboard-6-flexi",
    name: "CoreBoard 6 Flexi",
    category: "plasterboard",
    applicationAreas: ["Ceilings", "Interior walls"],
    fireRating: "A2",
    rValue: null,
    price: 9.8,
    unit: "per sheet",
    image: img.plasterboard,
    tag: null,
    shortDescription:
      "Thin 6 mm board that bends to form curved walls and ceilings.",
    overview:
      "CoreBoard 6 Flexi is a thin, flexible plasterboard that dry-bends to tight radii for curved bulkheads, arches and feature ceilings. Two layers are typically laminated to build up the required thickness.",
    specifications: [
      { label: "Thickness", value: "6 mm" },
      { label: "Board size", value: "1200 × 2400 mm" },
      { label: "Fire rating", value: "A2-s1, d0" },
      { label: "Min. dry radius", value: "1000 mm" },
      { label: "Weight", value: "5.2 kg/m²" },
      { label: "Edge profile", value: "Square" },
    ],
    applications: [
      "Curved bulkheads and arches",
      "Feature and vaulted ceilings",
      "Columns and curved partitions",
    ],
    compliance: {
      epd: true,
      hpd: false,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: ["Recycled gypsum core", "Recyclable", "Low-VOC certified"],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "400 KB" },
      { name: "Installation guide", type: "PDF", size: "820 KB" },
    ],
  },
  {
    id: "firestop-collar-110",
    name: "FireStop Collar 110",
    category: "fire-protection",
    applicationAreas: ["Partitions", "Floors"],
    fireRating: "A1",
    rValue: null,
    price: 18.5,
    unit: "each",
    image: img.fireboard,
    tag: null,
    shortDescription:
      "Intumescent pipe collar restoring fire integrity at penetrations.",
    overview:
      "FireStop Collar 110 is an intumescent pipe collar that closes around plastic pipe penetrations through fire-rated walls and floors. In a fire the collar expands to crush and seal the pipe, maintaining compartmentation.",
    specifications: [
      { label: "Pipe diameter", value: "110 mm" },
      { label: "Fire rating", value: "A1 housing" },
      { label: "Fire resistance", value: "Up to EI 120" },
      { label: "Housing", value: "Galvanized steel" },
      { label: "Fixing", value: "Surface or cast-in" },
      { label: "Activation", value: "Intumescent graphite" },
    ],
    applications: [
      "Plastic soil and waste pipe penetrations",
      "Fire-rated wall and floor seals",
      "Service riser fire stopping",
    ],
    compliance: {
      epd: false,
      hpd: false,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Long-life passive fire protection",
      "Recyclable steel housing",
      "No maintenance required",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "430 KB" },
      { name: "Fire test certificate", type: "PDF", size: "1.9 MB" },
    ],
  },
  {
    id: "firestop-acrylic-sealant",
    name: "FireStop Acrylic Sealant",
    category: "fire-protection",
    applicationAreas: ["Partitions", "Interior walls"],
    fireRating: "B",
    rValue: null,
    price: 7.3,
    unit: "per cartridge",
    image: img.fireboard,
    tag: null,
    shortDescription:
      "Fire-rated acrylic sealant for linear gaps and service joints.",
    overview:
      "FireStop Acrylic Sealant is a gun-grade fire-rated mastic for sealing linear joints, head-of-wall gaps and small service penetrations in fire-rated construction. It remains flexible to accommodate minor movement.",
    specifications: [
      { label: "Volume", value: "310 ml cartridge" },
      { label: "Fire rating", value: "B" },
      { label: "Fire resistance", value: "Up to EI 240 (joints)" },
      { label: "Movement", value: "±12.5%" },
      { label: "Overpaintable", value: "Yes" },
      { label: "Cure", value: "Skins in 20 min" },
    ],
    applications: [
      "Head-of-wall linear gap seals",
      "Perimeter joints in fire walls",
      "Small service penetration seals",
    ],
    compliance: {
      epd: false,
      hpd: false,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Water-based low-odour formula",
      "Overpaintable to reduce finishes",
      "Long shelf life",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "360 KB" },
      { name: "Safety data sheet", type: "PDF", size: "220 KB" },
    ],
  },
  {
    id: "acoustic-ceiling-tile-microlook",
    name: "Acoustic Tile MicroLook 600",
    category: "ceilings",
    applicationAreas: ["Ceilings"],
    fireRating: "A1",
    rValue: null,
    price: 8.2,
    unit: "per tile",
    image: img.ceiling,
    tag: null,
    shortDescription:
      "MicroLook edge ceiling tile for a fine reveal in a 15 mm grid.",
    overview:
      "Acoustic Tile MicroLook 600 has a rebated MicroLook edge that sits into a 15 mm grid, creating a crisp shadow-line reveal. High light reflectance and Class A absorption suit premium office fit-outs.",
    specifications: [
      { label: "Tile size", value: "600 × 600 mm" },
      { label: "Fire rating", value: "A1" },
      { label: "Sound absorption", value: "Class A" },
      { label: "Light reflectance", value: "89%" },
      { label: "Edge", value: "MicroLook 15 mm grid" },
      { label: "Humidity resistance", value: "Up to 95% RH" },
    ],
    applications: [
      "Premium suspended office ceilings",
      "Reception and meeting rooms",
      "Healthcare interiors",
    ],
    compliance: {
      epd: true,
      hpd: true,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Recycled mineral fibre content",
      "Take-back recycling scheme",
      "Improved acoustic comfort",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "420 KB" },
      { name: "Acoustic test report", type: "PDF", size: "1.1 MB" },
    ],
  },
  {
    id: "framepro-resilient-bar",
    name: "FramePro Resilient Bar",
    category: "drywall-systems",
    applicationAreas: ["Ceilings", "Interior walls"],
    fireRating: "A1",
    rValue: null,
    price: 5.4,
    unit: "per length",
    image: img.profile,
    tag: null,
    shortDescription:
      "Acoustic mounting bar that decouples boards to cut sound transfer.",
    overview:
      "FramePro Resilient Bar is a springy galvanized channel fixed across joists or studs to isolate plasterboard from the structure. This decoupling markedly reduces impact and airborne sound transmission.",
    specifications: [
      { label: "Length", value: "3000 mm" },
      { label: "Fire rating", value: "A1" },
      { label: "Steel gauge", value: "0.5 mm" },
      { label: "Coating", value: "Z275 galvanized" },
      { label: "Depth", value: "16 mm" },
      { label: "Fixing centres", value: "400–600 mm" },
    ],
    applications: [
      "Acoustic ceiling isolation",
      "Sound-rated wall linings",
      "Refurbishment sound upgrades",
    ],
    compliance: {
      epd: true,
      hpd: false,
      fireCertification: true,
      ceMarked: true,
    },
    sustainability: [
      "Fully recyclable steel",
      "High recycled content",
      "Improves acoustic performance",
    ],
    documents: [
      { name: "Specification sheet", type: "PDF", size: "330 KB" },
      { name: "Acoustic test report", type: "PDF", size: "980 KB" },
    ],
  },
  makeProduct("coreboard-10-light", "CoreBoard 10 Light", "plasterboard", img.plasterboard, 7.2, "per sheet", "Lightweight 10 mm board for fast interior linings.", ["Interior walls", "Ceilings"]),
  makeProduct("coreboard-acoustic-125", "CoreBoard Acoustic 12.5", "plasterboard", img.plasterboard, 15.4, "per sheet", "High-density acoustic board for quieter interiors.", ["Partitions", "Interior walls"], "A2", null, "Acoustic"),
  makeProduct("coreboard-impact-15", "CoreBoard Impact 15", "plasterboard", img.plasterboard, 17.8, "per sheet", "Impact-resistant board for busy circulation areas.", ["Partitions", "Interior walls"]),
  makeProduct("coreboard-external-125", "CoreBoard External 12.5", "plasterboard", img.plasterboard, 14.6, "per sheet", "Weather-protected sheathing board for external walls.", ["Exterior walls", "Facades"], "A2"),
  makeProduct("nordtherm-wall-60", "NordTherm Wall 60", "insulation", img.insulation, 18.6, "per pack", "Compact mineral wool slab for wall cavities.", ["Exterior walls", "Partitions"], "A1", 1.6),
  makeProduct("nordtherm-wall-140", "NordTherm Wall 140", "insulation", img.insulation, 31.5, "per pack", "Thicker stone wool slab for enhanced thermal performance.", ["Exterior walls", "Facades"], "A1", 3.8),
  makeProduct("nordtherm-floor-100", "NordTherm Floor 100", "insulation", img.insulation, 27.9, "per pack", "Dense acoustic and thermal insulation for floors.", ["Floors", "Partitions"], "A1", 2.7),
  makeProduct("nordtherm-roof-180", "NordTherm Roof 180", "insulation", img.insulation, 38.2, "per roll", "High-performance roll for pitched roof build-ups.", ["Roofs", "Ceilings"], "A1", 4.8),
  makeProduct("nordwall-single-stud", "NordWall Single Stud 70", "drywall-systems", img.profile, 42.0, "per system", "Efficient metal framing system for internal partitions.", ["Partitions", "Interior walls"], "A2"),
  makeProduct("nordwall-acoustic-stud", "NordWall Acoustic Stud 92", "drywall-systems", img.profile, 56.5, "per system", "Enhanced stud system for acoustic separation.", ["Partitions", "Interior walls"], "A2"),
  makeProduct("nordwall-shaftwall", "NordWall ShaftWall", "drywall-systems", img.profile, 68.0, "per system", "Tested shaft enclosure system for service risers.", ["Partitions", "Fire protection"], "A1"),
  makeProduct("nordwall-lining", "NordWall Dry Lining", "drywall-systems", img.profile, 35.8, "per system", "Direct-fix lining solution for faster refurbishment.", ["Interior walls", "Exterior walls"], "A2"),
  makeProduct("ceiling-grid-24", "NordGrid 24 Ceiling Grid", "ceilings", img.ceiling, 48.0, "per kit", "Clean exposed grid system for commercial interiors.", ["Ceilings"]),
  makeProduct("ceiling-grid-concealed", "NordGrid Concealed", "ceilings", img.ceiling, 62.0, "per kit", "Premium concealed grid for seamless ceiling planes.", ["Ceilings"], "A2", null, "Premium"),
  makeProduct("ceiling-acoustic-tile", "NordTone Acoustic Tile", "ceilings", img.ceiling, 22.4, "per tile", "Acoustic mineral tile for productive interiors.", ["Ceilings"], "A1"),
  makeProduct("ceiling-moisture-tile", "NordTone Humidity Tile", "ceilings", img.ceiling, 25.8, "per tile", "Moisture-resistant ceiling tile for humid spaces.", ["Ceilings", "Wet areas"], "A1"),
  makeProduct("fireboard-20", "CoreBoard 20 FireShield", "fire-protection", img.fireboard, 19.6, "per sheet", "Heavy-duty fire board for high-risk compartments.", ["Fire protection", "Partitions"], "A1"),
  makeProduct("fireboard-shaft", "CoreBoard ShaftShield", "fire-protection", img.fireboard, 21.2, "per sheet", "Lightweight shaft board for protected service zones.", ["Fire protection", "Partitions"], "A1"),
  makeProduct("fire-seal-compound", "NordSeal Fire Compound", "fire-protection", img.fireboard, 16.4, "per tub", "Fire-stopping compound for service penetrations.", ["Fire protection"], "A1"),
  makeProduct("fire-collar-110", "NordSeal Pipe Collar 110", "fire-protection", img.fireboard, 28.5, "per unit", "Tested collar for fire protection around pipework.", ["Fire protection", "Wet areas"], "A1"),
  makeProduct("setpro-base-25", "SetPro Base Plaster 25kg", "plasters", img.plaster, 10.8, "per bag", "Reliable base coat plaster for masonry and boards.", ["Interior walls", "Facades"], "A1"),
  makeProduct("setpro-machine-25", "SetPro Machine Plaster 25kg", "plasters", img.plaster, 13.4, "per bag", "Machine-applied plaster for efficient large-area work.", ["Interior walls", "Ceilings"], "A1"),
  makeProduct("nordcoat-facade", "NordCoat Facade Render", "plasters", img.plaster, 24.6, "per bucket", "Durable textured render for protected facade finishes.", ["Facades", "Exterior walls"], "A2"),
  makeProduct("nordcoat-skim", "NordCoat Fine Skim", "plasters", img.plaster, 14.2, "per bag", "Fine skim coat for smooth decorative surfaces.", ["Interior walls", "Ceilings"], "A1"),
];
