import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist | JainCo" },
      { name: "description", content: "Pieces you've saved for later — keep track of sizes and prices on your JainCo favourites." },
      { property: "og:title", content: "Your Wishlist | JainCo" },
      { property: "og:description", content: "Pieces you've saved for later at JainCo." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useShop();
  const items = wishlist.map(getProduct).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Saved</p>
      <h1 className="mt-1 font-display text-4xl">Your wishlist</h1>

      {items.length === 0 ? (
        <div className="mt-10 border border-border p-12 text-center">
          <p className="font-display text-2xl">Nothing saved yet</p>
          <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any piece to keep it here.</p>
          <Link to="/shop" className="btn-ink mt-6">Browse the collection</Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p!.id} product={p!} />
          ))}
        </div>
      )}
    </div>
  );
}
