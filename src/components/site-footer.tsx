import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl tracking-[0.18em] uppercase">JainCo</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Menswear rooted in Indian craft — bandi jackets, sherwanis and kurta sets tailored in Surat since 1978.
          </p>
        </div>
        <FooterCol
          title="Shop"
          links={[
            { label: "All ethnic wear", to: "/shop" },
            { label: "Wishlist", to: "/wishlist" },
            { label: "Your account", to: "/account" },
          ]}
        />
        <FooterCol
          title="Help"
          links={[
            { label: "Size guide", to: "/size-guide" },
            { label: "Shipping & returns", to: "/shipping-returns" },
          ]}
        />
        <div>
          <h3 className="eyebrow">Payments</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            UPI · Cards · Net banking · Cash on delivery up to ₹5,000. All transactions secured with 256-bit
            encryption.
          </p>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} JainCo. Crafted in India.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
