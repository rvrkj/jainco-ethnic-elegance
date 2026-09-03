import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { getProduct, inr } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag | JainCo" },
      { name: "description", content: "Review your JainCo bag, adjust sizes and quantities, and move to secure checkout." },
      { property: "og:title", content: "Your Bag | JainCo" },
      { property: "og:description", content: "Review your JainCo bag and check out securely." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { cart, setQty, removeLine } = useShop();
  const lines = cart.map((l) => ({ ...l, product: getProduct(l.id)! })).filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl">Your bag</h1>

      {lines.length === 0 ? (
        <div className="mt-10 border border-border p-12 text-center">
          <p className="font-display text-2xl">Your bag is empty</p>
          <p className="mt-2 text-sm text-muted-foreground">The bandi edit is a good place to start.</p>
          <Link to="/shop" className="btn-ink mt-6">Shop now</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <ul className="divide-y divide-border border-y border-border">
            {lines.map((l) => (
              <li key={`${l.id}-${l.size}`} className="grid grid-cols-[88px_minmax(0,1fr)_auto] gap-4 py-6">
                <img src={l.product.image} alt={l.product.name} loading="lazy" width={176} height={264} className="aspect-[2/3] w-22 object-cover" />
                <div className="min-w-0">
                  <h2 className="font-display text-lg leading-tight">{l.product.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{l.product.art} · Size {l.size}</p>
                  <div className="mt-3 inline-flex items-center border border-input">
                    <button onClick={() => setQty(l.id, l.size, l.qty - 1)} aria-label="Decrease quantity" className="px-2 py-1.5">
                      <Minus className="size-3.5" />
                    </button>
                    <span className="min-w-8 text-center text-sm">{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.size, l.qty + 1)} aria-label="Increase quantity" className="px-2 py-1.5">
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">{inr(l.product.price * l.qty)}</p>
                  <button onClick={() => removeLine(l.id, l.size)} aria-label={`Remove ${l.product.name}`} className="mt-3 text-muted-foreground">
                    <X className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border p-7">
            <h2 className="eyebrow">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd>Free</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt>Total</dt><dd>{inr(subtotal + shipping)}</dd>
              </div>
            </dl>
            <Link to="/checkout" className="btn-ink mt-6 w-full">Checkout securely</Link>
            <p className="mt-4 text-xs text-muted-foreground">
              UPI · Cards · Net banking · COD up to ₹5,000. 7-day returns on every order.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
