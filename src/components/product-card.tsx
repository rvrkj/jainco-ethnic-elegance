import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { inr, type Product } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { toggleWish, isWished } = useShop();
  const wished = isWished(product.id);

  return (
    <article className="group relative">
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="block overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={`${product.name} — art no. ${product.art}`}
          loading={priority ? "eager" : "lazy"}
          width={800}
          height={1200}
          className="aspect-[2/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <button
        onClick={() => toggleWish(product.id)}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        aria-pressed={wished}
        className="absolute top-3 right-3 grid size-9 place-items-center bg-background/90 transition-colors hover:bg-background"
      >
        <Heart className={`size-4 ${wished ? "fill-primary text-primary" : ""}`} />
      </button>
      <div className="mt-3 space-y-1">
        <p className="eyebrow">{product.art} · {product.colour}</p>
        <h3 className="font-display text-lg leading-tight">
          <Link to="/product/$productId" params={{ productId: product.id }}>
            {product.name}
          </Link>
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium">{inr(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</span>
        </div>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3 fill-gold text-gold" aria-hidden />
          {product.rating} <span>({product.reviewCount})</span>
        </p>
      </div>
    </article>
  );
}
