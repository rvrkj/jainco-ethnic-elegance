import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { inr, products } from "@/lib/products";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account & Orders | JainCo" },
      { name: "description", content: "Track JainCo orders, manage addresses and saved sizes, and start a return or exchange." },
      { property: "og:title", content: "Your Account & Orders | JainCo" },
      { property: "og:description", content: "Track orders, manage addresses and start a return." },
    ],
  }),
  component: Account,
});

type Order = { id: string; date: string; status: string; items: typeof products };

const orders: Order[] = [
  { id: "JC-482910", date: "18 Aug 2026", status: "Delivered", items: [products[0]!, products[3]!] },
  { id: "JC-477201", date: "2 Jul 2026", status: "Delivered", items: [products[2]!] },
  { id: "JC-491044", date: "1 Sep 2026", status: "In transit", items: [products[5]!] },
];

const tabs = ["Orders", "Addresses", "Saved sizes"] as const;

function Account() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Orders");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Account</p>
      <h1 className="mt-1 font-display text-4xl">Hello, Rajeev</h1>

      <div className="mt-8 flex gap-6 border-b border-border" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 pb-3 text-xs tracking-[0.14em] uppercase ${tab === t ? "border-ink text-foreground" : "border-transparent text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Orders" && (
        <ul className="mt-8 space-y-5">
          {orders.map((o) => (
            <li key={o.id} className="border border-border p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{o.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Placed {o.date}</p>
                </div>
                <span className="shrink-0 border border-border px-3 py-1 text-xs tracking-[0.12em] uppercase">{o.status}</span>
              </div>
              <ul className="mt-5 space-y-4">
                {o.items.map((p) => (
                  <li key={p.id} className="flex gap-4">
                    <img src={p.image} alt={p.name} loading="lazy" width={128} height={192} className="aspect-[2/3] w-16 object-cover" />
                    <div className="min-w-0">
                      <Link to="/product/$productId" params={{ productId: p.id }} className="text-sm hover:underline">
                        {p.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">{p.art} · {inr(p.price)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="btn-outline-ink">Track order</button>
                <button className="btn-outline-ink">Return or exchange</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {tab === "Addresses" && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {["Home · Andheri West, Mumbai 400058", "Office · Lower Parel, Mumbai 400013"].map((a) => (
            <div key={a} className="border border-border p-6 text-sm">
              {a}
              <p className="mt-4 text-xs text-muted-foreground">Default for cash on delivery</p>
            </div>
          ))}
        </div>
      )}

      {tab === "Saved sizes" && (
        <div className="mt-8 border border-border p-6 text-sm">
          <p>Bandi & sherwani: <strong>40</strong> · Kurta: <strong>M</strong></p>
          <p className="mt-3 text-xs text-muted-foreground">
            We use your saved size to flag stock and to pre-select on product pages.
          </p>
          <Link to="/size-guide" className="btn-outline-ink mt-5">Open size guide</Link>
        </div>
      )}
    </div>
  );
}
