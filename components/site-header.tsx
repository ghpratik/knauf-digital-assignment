import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/products#categories" },
  { label: "Solutions", href: "/products" },
  { label: "About", href: "/products" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-350 items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            className="h-10 px-4 text-sm"
            render={<Link href="/products" />}
          >
            Browse catalog
          </Button>
        </div>
      </div>
    </header>
  );
}
