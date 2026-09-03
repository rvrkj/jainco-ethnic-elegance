import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = { id: string; size: number; qty: number };

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  addToCart: (id: string, size: number) => void;
  setQty: (id: string, size: number, qty: number) => void;
  removeLine: (id: string, size: number) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;
  isWished: (id: string) => boolean;
  cartCount: number;
};

const Ctx = createContext<ShopState | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>("jainco.cart", []));
    setWishlist(read<string[]>("jainco.wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("jainco.cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("jainco.wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<ShopState>(
    () => ({
      cart,
      wishlist,
      addToCart: (id, size) =>
        setCart((c) => {
          const found = c.find((l) => l.id === id && l.size === size);
          return found
            ? c.map((l) => (l === found ? { ...l, qty: l.qty + 1 } : l))
            : [...c, { id, size, qty: 1 }];
        }),
      setQty: (id, size, qty) =>
        setCart((c) =>
          qty <= 0
            ? c.filter((l) => !(l.id === id && l.size === size))
            : c.map((l) => (l.id === id && l.size === size ? { ...l, qty } : l)),
        ),
      removeLine: (id, size) => setCart((c) => c.filter((l) => !(l.id === id && l.size === size))),
      clearCart: () => setCart([]),
      toggleWish: (id) =>
        setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
      isWished: (id) => wishlist.includes(id),
      cartCount: cart.reduce((s, l) => s + l.qty, 0),
    }),
    [cart, wishlist],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
