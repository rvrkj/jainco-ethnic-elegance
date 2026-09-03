import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping, Returns & Payments | JainCo" },
      { name: "description", content: "Free tracked shipping across India, 7-day returns, free size exchanges, and payment options including UPI, cards and cash on delivery." },
      { property: "og:title", content: "Shipping, Returns & Payments | JainCo" },
      { property: "og:description", content: "Free shipping, 7-day returns and flexible Indian payment options." },
    ],
  }),
  component: ShippingReturns,
});

const blocks = [
  {
    h: "Shipping",
    p: "Free tracked shipping on every order across India, dispatched within 24 hours on working days and delivered in 3–5 days. Metro pin codes usually see it in 2. You get an SMS and email with live tracking the moment it leaves Surat.",
  },
  {
    h: "Returns",
    p: "Seven days from delivery, for any reason. Keep tags on and the piece unworn. Raise it from your account, we schedule a free pickup, and the refund lands in your original payment method within 5 working days.",
  },
  {
    h: "Exchanges",
    p: "Free size exchanges within 7 days, one per order. If your size is out of stock we refund in full rather than making you wait.",
  },
  {
    h: "Payments",
    p: "UPI (GPay, PhonePe, Paytm), credit and debit cards including RuPay, net banking with all major Indian banks, and cash on delivery for orders up to ₹5,000. Payments are processed over 256-bit encryption; we never store card details.",
  },
  {
    h: "Quality assurance",
    p: "Every garment is checked for weave consistency, stitch density, button fastening and finish before it is packed. If something slipped through, tell us and we will replace it outright.",
  },
];

function ShippingReturns() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Policies</p>
      <h1 className="mt-1 font-display text-4xl">Shipping, returns & payments</h1>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {blocks.map((b) => (
          <section key={b.h} className="py-7">
            <h2 className="font-display text-2xl">{b.h}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
