import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, RefreshCw, Ruler, Truck } from "lucide-react";
import { heroImage, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JainCo — Men's Ethnic Wear, Tailored in India" },
      {
        name: "description",
        content:
          "Bandi jackets, sherwanis and kurta sets for weddings and festive days. Indian craft, modern tailoring, free shipping and 7-day returns.",
      },
      { property: "og:title", content: "JainCo — Men's Ethnic Wear, Tailored in India" },
      {
        property: "og:description",
        content: "Bandi jackets, sherwanis and kurta sets for weddings and festive days.",
      },
    ],
  }),
  component: Home,
});

const categories = [
  { label: "Bandi Jackets", note: "The layer that finishes a look", search: { category: "bandi" } },
  { label: "Sherwani", note: "For the day it all matters", search: { category: "sherwani" } },
  { label: "Kurta Sets", note: "Festive ease, every day", search: { category: "kurta" } },
] as const;

function Home() {
  return (
    <>
      <section className="relative">
        <img
          src={heroImage}
          alt="Man wearing an indigo embroidered sherwani in a heritage courtyard"
          width={1408}
          height={1760}
          className="h-[78vh] min-h-[520px] w-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-14 sm:px-6">
          <p className="eyebrow text-primary-foreground/80">Wedding Season 2026</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-[1.05] text-primary-foreground sm:text-6xl">
            Ethnic wear cut for the way men actually stand.
          </h1>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/85">
            Handloom-inspired weaves, tailored in Surat, sized 36 to 44.
          </p>
          <Link to="/shop" className="btn-ink mt-7 bg-background text-foreground hover:bg-secondary">
            Shop the collection
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.label}
              to="/shop"
              search={c.search}
              className="group border border-border p-8 transition-colors hover:bg-secondary"
            >
              <h2 className="font-display text-2xl">{c.label}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.note}</p>
              <span className="mt-6 inline-block text-xs tracking-[0.16em] uppercase group-hover:underline">
                Explore
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between rule-gold pb-4">
          <div>
            <p className="eyebrow">Just landed</p>
            <h2 className="mt-1 font-display text-3xl">The Bandi Edit</h2>
          </div>
          <Link to="/shop" className="text-xs tracking-[0.16em] uppercase underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 border-y border-border py-12 sm:grid-cols-2 lg:grid-cols-4">
          <Trust icon={<Truck className="size-5" />} title="Free shipping" body="Delivered across India in 3–5 days, tracked end to end." />
          <Trust icon={<RefreshCw className="size-5" />} title="7-day returns" body="Doesn't sit right? Send it back, no questions asked." />
          <Trust icon={<Ruler className="size-5" />} title="Real measurements" body="Chest, shoulder and length listed on every product." />
          <Trust icon={<Award className="size-5" />} title="Quality checked" body="Every piece inspected for weave, stitch and finish." />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <p className="eyebrow">What buyers say</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { q: "Third order this year. The fits are consistent, which is rare.", n: "Aniket S., Pune" },
            { q: "Ordered on Tuesday, wore it on Saturday. Fabric felt premium.", n: "Rahul M., Jaipur" },
            { q: "Exchanged a size in two days without a single phone call.", n: "Devang P., Ahmedabad" },
          ].map((t) => (
            <blockquote key={t.n} className="border border-border p-7">
              <p className="font-display text-xl leading-snug">“{t.q}”</p>
              <footer className="mt-4 text-xs tracking-[0.14em] uppercase text-muted-foreground">{t.n}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}

function Trust({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 shrink-0 text-primary" aria-hidden>{icon}</span>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
