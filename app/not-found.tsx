import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main className="flex flex-1 items-center border-b border-border bg-muted/30">
        <section className="mx-auto w-full max-w-350 px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              <span className="grid size-9 place-items-center rounded-full bg-brand/10">
                <Search className="size-4" aria-hidden="true" />
              </span>
              Error 404
            </div>
            <h1 className="mt-7 text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
              This page is not part of the build.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
              The page you&apos;re looking for may have moved, or the link may
              be out of date. Let&apos;s get you back to the materials
              catalogue.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button nativeButton={false} render={<Link href="/products" />}>
                Explore products
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/" />}
              >
                <ArrowLeft data-icon="inline-start" />
                Back to home
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
