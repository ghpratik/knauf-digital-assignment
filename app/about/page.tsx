import Link from "next/link";
import { ArrowUpRight, Check, Factory, Leaf, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const principles = [
  { icon: Factory, title: "Made for real sites", text: "Our catalogue is shaped around the decisions, constraints and pace of construction teams." },
  { icon: Leaf, title: "Lower impact by design", text: "We make better material choices visible, from recycled content to end-of-life planning." },
  { icon: Users, title: "Technical when it matters", text: "Clear information and practical support help every project team specify with confidence." },
];

export default function AboutPage() {
  return <div className="flex min-h-svh flex-col bg-background"><SiteHeader /><main className="flex-1">
    <section className="border-b border-border bg-muted/30"><div className="mx-auto max-w-350 px-4 py-20 sm:px-6 lg:px-10 lg:py-28"><Badge variant="outline">About Nordkern</Badge><h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">Better building starts with better decisions.</h1><p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">Nordkern is a materials partner for the people turning drawings into durable, comfortable and responsible buildings.</p></div></section>
    <section className="mx-auto grid max-w-350 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-24"><div><p className="text-sm font-semibold uppercase tracking-widest text-brand">Our point of view</p><h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">The best specification is the one that works all the way through.</h2></div><div className="flex flex-col gap-5 text-lg leading-8 text-muted-foreground"><p>Materials do more than fill a bill of quantities. They influence the comfort, safety, speed and long-term performance of every space.</p><p>That is why we bring products and systems together in one practical catalogue, with the information teams need to move forward.</p><Button nativeButton={false} className="w-fit" render={<Link href="/products" />}>Browse the catalogue <ArrowUpRight data-icon="inline-end" /></Button></div></section>
    <section className="border-y border-border bg-muted/20"><div className="mx-auto grid max-w-350 gap-5 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-10 lg:py-24">{principles.map(({ icon: Icon, title, text }) => <article key={title} className="flex flex-col gap-8 border-border md:border-l md:pl-6 first:border-0 first:pl-0"><Icon className="text-brand" aria-hidden="true" /><div><h2 className="text-xl font-semibold">{title}</h2><p className="mt-3 leading-6 text-muted-foreground">{text}</p></div></article>)}</div></section>
    <section className="mx-auto max-w-350 px-4 py-16 sm:px-6 lg:px-10 lg:py-24"><div className="rounded-2xl border border-border bg-card p-8 sm:p-12"><p className="text-sm font-semibold uppercase tracking-widest text-brand">What we stand for</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Clear technical information", "Systems that install together", "Responsible material choices", "Support from brief to build"].map((item) => <p key={item} className="flex items-center gap-3 text-lg"><Check className="text-brand" aria-hidden="true" />{item}</p>)}</div></div></section>
  </main><SiteFooter /></div>;
}
