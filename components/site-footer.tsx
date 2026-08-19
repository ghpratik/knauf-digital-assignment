import Link from "next/link";
import { Logo } from "@/components/logo";

const columns = [
  {
    heading: "Catalog",
    links: [
      { label: "Plasterboard", href: "/products?category=plasterboard" },
      { label: "Insulation", href: "/products?category=insulation" },
      { label: "Ceilings", href: "/products?category=ceilings" },
      { label: "All products", href: "/products" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Nordkern", href: "/products" },
      { label: "Sustainability", href: "/products" },
      { label: "Careers", href: "/products" },
      { label: "Contact", href: "/products" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Delivery", href: "/products" },
      { label: "Returns", href: "/products" },
      { label: "Technical help", href: "/products" },
      { label: "Datasheets", href: "/products" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-background">
      <div className="mx-auto w-full max-w-350 px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The building materials catalog engineered for the trade — precise
              specs, honest stock, from the core out.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nordkern. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/products"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/products"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
