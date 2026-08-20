import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, FileCheck2 } from "lucide-react";

const reasons = [
  {
    icon: Compass,
    title: "Specify with confidence",
    text: "Compare the performance details that matter before materials reach site.",
  },
  {
    icon: FileCheck2,
    title: "Keep the whole system in view",
    text: "Move from a single product to compatible build-ups, applications and documents.",
  },
  {
    icon: CheckCircle2,
    title: "Make every decision count",
    text: "Clear product information helps teams reduce rework and keep projects moving.",
  },
];

export function MarketingOverview() {
  return (
    <section className="w-full border-b border-border bg-foreground text-background">
      <div className="mx-auto grid w-full max-w-350 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Built around the work
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            The right information, at the moment it matters.
          </h2>
          <p className="mt-5 max-w-lg leading-7 text-background/65">
            Nordkern brings product knowledge, technical performance and
            practical application together in one place, so every trade can move
            from question to confident specification.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-background transition-colors hover:text-brand"
          >
            Why Nordkern <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15 sm:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <article key={title} className="bg-foreground p-6 sm:p-7">
              <Icon className="size-6 text-brand" aria-hidden="true" />
              <h3 className="mt-12 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-background/60">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
