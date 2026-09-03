import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useShop } from "@/lib/shop-store";

const nav = [
  { to: "/shop", label: "Bandi Jackets", search: { category: "bandi" } },
  { to: "/shop", label: "Sherwani", search: { category: "sherwani" } },
  { to: "/shop", label: "Kurta Sets", search: { category: "kurta" } },
  { to: "/shop", label: "Wedding Edit", search: { occasion: "Wedding" } },
] as const;

export function SiteHeader() {
  const { cartCount, wishlist } = useShop();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <p className="bg-ink py-2 text-center text-[0.65rem] tracking-[0.2em] text-primary-foreground uppercase">
        Free shipping across India · 7-day easy returns
      </p>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6">
        <button
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <div className="flex min-w-0 items-center gap-8">
          <Link to="/" className="shrink-0 font-display text-2xl tracking-[0.18em] uppercase">
            JainCo
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                search={n.search}
                className="text-xs tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <Link to="/shop" aria-label="Search products" className="hidden sm:block">
            <Search className="size-5" />
          </Link>
          <Link to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`} className="relative">
            <Heart className="size-5" />
            {wishlist.length > 0 && <Badge n={wishlist.length} />}
          </Link>
          <Link to="/account" aria-label="Your account" className="hidden sm:block">
            <User className="size-5" />
          </Link>
          <Link to="/cart" aria-label={`Cart, ${cartCount} items`} className="relative">
            <ShoppingBag className="size-5" />
            {cartCount > 0 && <Badge n={cartCount} />}
          </Link>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border px-4 py-3 lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              search={n.search}
              onClick={() => setOpen(false)}
              className="block py-3 text-xs tracking-[0.14em] uppercase"
            >
              {n.label}
            </Link>
          ))}
          <Link to="/account" onClick={() => setOpen(false)} className="block py-3 text-xs tracking-[0.14em] uppercase">
            Account
          </Link>
        </nav>
      )}
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -top-1.5 -right-2 grid size-4 place-items-center rounded-full bg-primary text-[0.6rem] text-primary-foreground">
      {n}
    </span>
  );
}
