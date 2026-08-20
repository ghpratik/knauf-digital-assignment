import Link from "next/link";
import { ArrowRight, Check, Ruler, ShieldCheck, Volume2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const solutions = [
  { icon: ShieldCheck, title: "Fire-safe construction", text: "Build tested compartmentation into walls, ceilings and service zones from the first drawing." },
  { icon: Volume2, title: "Acoustic comfort", text: "Create calmer homes, workplaces and learning environments with coordinated systems." },
  { icon: Ruler, title: "Faster fit-out", text: "Move from specification to installation with compatible products and clear details." },
];

export default function SolutionsPage() {
  return <div className="flex min-h-svh flex-col bg-background"><SiteHeader /><main className="flex-1">
    <section className="border-b border-border bg-muted/30"><div className="mx-auto max-w-350 px-4 py-20 sm:px-6 lg:px-10 lg:py-28"><Badge variant="outline">Solutions</Badge><h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">Performance is a system, not a single product.</h1><p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">From early design intent to the final fix, Nordkern brings materials, systems and technical thinking together.</p></div></section>
    <section className="mx-auto grid max-w-350 gap-6 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-10 lg:py-24">{solutions.map(({ icon: Icon, title, text }) => <article key={title} className="flex min-h-72 flex-col justify-between rounded-2xl border border-border bg-card p-6"><Icon className="text-brand" aria-hidden="true" /><div><h2 className="text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-3 leading-6 text-muted-foreground">{text}</p></div></article>)}</section>
    <section className="border-y border-border"><div className="mx-auto flex max-w-350 flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-20"><div><p className="text-sm font-semibold uppercase tracking-widest text-brand">Start with the right system</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Find a coordinated route from brief to build.</h2></div><Button nativeButton={false} render={<Link href="/categories" />}>Explore categories <ArrowRight data-icon="inline-end" /></Button></div></section>
  </main><SiteFooter /></div>;
}
