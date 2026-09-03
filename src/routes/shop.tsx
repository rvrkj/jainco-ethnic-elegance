import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { occasions, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

type ShopSearch = { category?: string | undefined; occasion?: string | undefined; q?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    category: typeof s["category"] === "string" ? (s["category"] as string) : undefined,
    occasion: typeof s["occasion"] === "string" ? (s["occasion"] as string) : undefined,
    q: typeof s["q"] === "string" ? (s["q"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Men's Ethnic Wear — Bandi, Sherwani, Kurta | JainCo" },
      {
        name: "description",
        content:
          "Browse JainCo men's ethnic wear. Filter by style, size, occasion, colour and price. Sizes 36–44, free shipping across India.",
      },
      { property: "og:title", content: "Shop Men's Ethnic Wear | JainCo" },
      { property: "og:description", content: "Filter bandi jackets, sherwanis and kurta sets by size, occasion and price." },
    ],
  }),
  component: Shop,
});

const sizesAll = [36, 38, 40, 42, 44];

function Shop() {
  const search = Route.useSearch();
  const [query, setQuery] = useState(search.q ?? "");
  const [size, setSize] = useState<number | null>(null);
  const [occasion, setOccasion] = useState<string | null>(search.occasion ?? null);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sort, setSort] = useState("featured");

  const results = useMemo(() => {
    let list = products.filter((p) => {
      if (search.category && p.category !== search.category) return false;
      if (occasion && !p.occasion.includes(occasion)) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (p.price > maxPrice) return false;
      if (query) {
        const hay = `${p.name} ${p.art} ${p.colour} ${p.fabric} ${p.origin}`.toLowerCase();
        if (!hay.includes(query.toLowerCase())) return false;
      }
      return true;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search.category, occasion, size, maxPrice, query, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Collection</p>
      <h1 className="mt-1 font-display text-4xl capitalize">{search.category ?? "All ethnic wear"}</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Every piece lists fabric, fit, cultural origin and full measurements. Sizes 36–44.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-8" aria-label="Filters">
          <div>
            <label htmlFor="q" className="eyebrow">Search</label>
            <input
              id="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Weave, colour, art no."
              className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <fieldset>
            <legend className="eyebrow">Size</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizesAll.map((s) => (
                <button
                  key={s}
                  aria-pressed={size === s}
                  onClick={() => setSize(size === s ? null : s)}
                  className={`border px-3 py-1.5 text-sm ${size === s ? "border-ink bg-ink text-primary-foreground" : "border-input"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow">Occasion</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {occasions.map((o) => (
                <button
                  key={o}
                  aria-pressed={occasion === o}
                  onClick={() => setOccasion(occasion === o ? null : o)}
                  className={`border px-3 py-1.5 text-xs ${occasion === o ? "border-ink bg-ink text-primary-foreground" : "border-input"}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="price" className="eyebrow">Max price · ₹{maxPrice.toLocaleString("en-IN")}</label>
            <input
              id="price"
              type="range"
              min={999}
              max={2000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--ink)]"
            />
          </div>

          <div>
            <label htmlFor="sort" className="eyebrow">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </aside>

        <div>
          <p className="mb-6 text-xs tracking-[0.14em] uppercase text-muted-foreground" aria-live="polite">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
          </p>
          {results.length === 0 ? (
            <div className="border border-border p-12 text-center">
              <p className="font-display text-2xl">Nothing matches those filters</p>
              <p className="mt-2 text-sm text-muted-foreground">Try widening the price range or clearing occasion.</p>
              <Link to="/shop" className="btn-outline-ink mt-6">Reset filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
