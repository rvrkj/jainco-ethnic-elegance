import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, RefreshCw, ShieldCheck, Star, Truck } from "lucide-react";
import { getProduct, inr, products, sizeChart } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found | JainCo" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    const title = `${p.name} (${p.art}) | JainCo`;
    const description = `${p.fabric}. ${p.fit}. Sizes 36–44 at ${inr(p.price)}. Free shipping and 7-day returns.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWish, isWished } = useShop();
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="hover:underline">Home</Link> / <Link to="/shop" className="hover:underline">Shop</Link> /{" "}
        <span className="text-foreground">{product.art}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <img
          src={product.image}
          alt={`${product.name}, ${product.colour}, art no. ${product.art}`}
          width={1067}
          height={1600}
          className="w-full bg-muted object-cover"
        />

        <div>
          <p className="eyebrow">{product.art} · {product.colour}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex" aria-label={`${product.rating} out of 5`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`size-4 ${i <= Math.round(product.rating) ? "fill-gold text-gold" : "text-border"}`} aria-hidden />
              ))}
            </span>
            <a href="#reviews" className="text-muted-foreground underline underline-offset-4">
              {product.reviewCount} reviews
            </a>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl">{inr(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
            <span className="text-xs tracking-[0.14em] uppercase text-primary">
              Save {Math.round((1 - product.price / product.mrp) * 100)}%
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <fieldset className="mt-7">
            <div className="flex items-center justify-between">
              <legend className="eyebrow">Select size</legend>
              <button onClick={() => setShowChart((v) => !v)} className="text-xs underline underline-offset-4">
                Size guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  className={`min-w-14 border px-4 py-2.5 text-sm ${size === s ? "border-ink bg-ink text-primary-foreground" : "border-input"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          {showChart && (
            <table className="mt-5 w-full border border-border text-sm">
              <caption className="sr-only">Size chart in inches</caption>
              <thead className="bg-secondary">
                <tr>
                  {["Size", "Chest", "Shoulder", "Length"].map((h) => (
                    <th key={h} scope="col" className="p-2 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((r) => (
                  <tr key={r.size} className="border-t border-border">
                    <th scope="row" className="p-2 text-left font-normal">{r.size}</th>
                    <td className="p-2">{r.chest}</td>
                    <td className="p-2">{r.shoulder}</td>
                    <td className="p-2">{r.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              className="btn-ink flex-1"
              disabled={!size}
              onClick={() => {
                if (!size) return;
                addToCart(product.id, size);
                setAdded(true);
              }}
            >
              {size ? "Add to bag" : "Select a size"}
            </button>
            <button
              onClick={() => toggleWish(product.id)}
              aria-pressed={isWished(product.id)}
              className="btn-outline-ink"
            >
              <Heart className={`size-4 ${isWished(product.id) ? "fill-primary text-primary" : ""}`} />
              Save
            </button>
          </div>
          {added && (
            <p className="mt-3 text-sm" aria-live="polite">
              Added to your bag. <Link to="/cart" className="underline underline-offset-4">View bag</Link>
            </p>
          )}

          <dl className="mt-9 divide-y divide-border border-y border-border text-sm">
            <Row label="Fabric" value={product.fabric} />
            <Row label="Fit" value={product.fit} />
            <Row label="Cultural origin" value={product.origin} />
            <Row label="Occasion" value={product.occasion.join(", ")} />
            <Row label="Care" value={product.care} />
          </dl>

          <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><Truck className="size-4 shrink-0" aria-hidden /> Free shipping, delivered in 3–5 days</li>
            <li className="flex gap-3"><RefreshCw className="size-4 shrink-0" aria-hidden /> 7-day returns and free size exchange</li>
            <li className="flex gap-3"><ShieldCheck className="size-4 shrink-0" aria-hidden /> UPI, cards, net banking, COD up to ₹5,000</li>
          </ul>
        </div>
      </div>

      <section id="reviews" className="mt-20">
        <div className="rule-gold pb-4">
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-1 font-display text-3xl">{product.rating} out of 5 · {product.reviewCount} ratings</h2>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {product.reviews.map((r) => (
            <article key={r.name} className="border border-border p-6">
              <div className="flex" aria-label={`${r.stars} out of 5`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`size-3.5 ${i <= r.stars ? "fill-gold text-gold" : "text-border"}`} aria-hidden />
                ))}
              </div>
              <p className="mt-3 text-sm">{r.body}</p>
              <p className="mt-3 text-xs text-muted-foreground">{r.name} · bought size {r.size}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="rule-gold pb-4">
          <p className="eyebrow">You may also like</p>
          <h2 className="mt-1 font-display text-3xl">Pairs well with this</h2>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 py-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
