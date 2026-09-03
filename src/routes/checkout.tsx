import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { getProduct, inr } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | JainCo" },
      { name: "description", content: "Complete your JainCo order — delivery details, payment method and order review in three steps." },
      { property: "og:title", content: "Secure Checkout | JainCo" },
      { property: "og:description", content: "Three-step checkout with UPI, cards, net banking and cash on delivery." },
    ],
  }),
  component: Checkout,
});

const steps = ["Delivery", "Payment", "Review"];

function Checkout() {
  const { cart, clearCart } = useShop();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [payment, setPayment] = useState("upi");

  const lines = cart.map((l) => ({ ...l, product: getProduct(l.id)! })).filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <p className="eyebrow">Order confirmed</p>
        <h1 className="mt-3 font-display text-4xl">Thank you — it's on its way.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Order JC-{Math.floor(100000 + Math.random() * 899999)} · arriving in 3–5 days. A confirmation is in your inbox.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/account" className="btn-ink">View orders</Link>
          <Link to="/shop" className="btn-outline-ink">Keep shopping</Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl">Nothing to check out</h1>
        <Link to="/shop" className="btn-ink mt-6">Shop the collection</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl">Checkout</h1>

      <ol className="mt-6 flex gap-6 text-xs tracking-[0.14em] uppercase">
        {steps.map((s, i) => (
          <li key={s} className={i === step ? "text-foreground" : "text-muted-foreground"} aria-current={i === step ? "step" : undefined}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 2) setStep(step + 1);
            else {
              clearCart();
              setPlaced(true);
            }
          }}
        >
          {step === 0 && (
            <>
              <Field id="name" label="Full name" autoComplete="name" />
              <Field id="phone" label="Mobile number" type="tel" autoComplete="tel" />
              <Field id="address" label="Address" autoComplete="street-address" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="city" label="City" autoComplete="address-level2" />
                <Field id="pin" label="PIN code" autoComplete="postal-code" inputMode="numeric" />
              </div>
            </>
          )}

          {step === 1 && (
            <fieldset className="space-y-3">
              <legend className="eyebrow">Payment method</legend>
              {[
                { id: "upi", label: "UPI", note: "GPay, PhonePe, Paytm" },
                { id: "card", label: "Credit / debit card", note: "Visa, Mastercard, RuPay" },
                { id: "netbanking", label: "Net banking", note: "All major Indian banks" },
                { id: "cod", label: "Cash on delivery", note: "Orders up to ₹5,000" },
              ].map((m) => (
                <label key={m.id} className={`flex cursor-pointer items-start gap-3 border p-4 ${payment === m.id ? "border-ink" : "border-input"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id)}
                    className="mt-1 accent-[var(--ink)]"
                  />
                  <span>
                    <span className="block text-sm font-medium">{m.label}</span>
                    <span className="block text-xs text-muted-foreground">{m.note}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          )}

          {step === 2 && (
            <div className="border border-border p-6">
              <h2 className="eyebrow">Review</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {lines.map((l) => (
                  <li key={`${l.id}-${l.size}`} className="flex justify-between gap-4">
                    <span className="min-w-0">{l.product.name} · size {l.size} × {l.qty}</span>
                    <span>{inr(l.product.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">Paying by {payment.toUpperCase()} · free shipping · 7-day returns.</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="btn-outline-ink">
                Back
              </button>
            )}
            <button type="submit" className="btn-ink flex-1">
              {step === 2 ? "Place order" : "Continue"}
            </button>
          </div>
        </form>

        <aside className="h-fit border border-border p-7">
          <h2 className="eyebrow">Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>Free</dd></div>
            <div className="flex justify-between border-t border-border pt-3 text-base"><dt>Total</dt><dd>{inr(subtotal)}</dd></div>
          </dl>
          <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5" aria-hidden /> Secured with 256-bit encryption
          </p>
        </aside>
      </div>
    </div>
  );
}

function Field({ id, label, ...rest }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow">{label}</label>
      <input id={id} name={id} required className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm" {...rest} />
    </div>
  );
}
