import { createFileRoute } from "@tanstack/react-router";
import { sizeChart } from "@/lib/products";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide & Fit Notes | JainCo" },
      { name: "description", content: "Measurements in inches for JainCo bandi jackets and sherwanis, sizes 36 to 44, plus how to measure and choose your fit." },
      { property: "og:title", content: "Size Guide & Fit Notes | JainCo" },
      { property: "og:description", content: "Chest, shoulder and length measurements for sizes 36–44." },
    ],
  }),
  component: SizeGuide,
});

function SizeGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Fit</p>
      <h1 className="mt-1 font-display text-4xl">Size guide</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Every JainCo piece is cut to garment measurements listed in inches. Measure a jacket you already own and
        match it to the table — that is more reliable than body measurements.
      </p>

      <table className="mt-8 w-full border border-border text-sm">
        <caption className="sr-only">Bandi and sherwani measurements in inches</caption>
        <thead className="bg-secondary">
          <tr>
            {["Size", "Chest", "Shoulder", "Length"].map((h) => (
              <th key={h} scope="col" className="p-3 text-left font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizeChart.map((r) => (
            <tr key={r.size} className="border-t border-border">
              <th scope="row" className="p-3 text-left font-normal">{r.size}</th>
              <td className="p-3">{r.chest}</td>
              <td className="p-3">{r.shoulder}</td>
              <td className="p-3">{r.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-12 font-display text-2xl">How to measure</h2>
      <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
        <li><strong className="text-foreground">Chest.</strong> Lay the jacket flat and measure armpit to armpit, then double it.</li>
        <li><strong className="text-foreground">Shoulder.</strong> Seam to seam across the back.</li>
        <li><strong className="text-foreground">Length.</strong> Base of the collar down to the hem.</li>
      </ol>

      <h2 className="mt-12 font-display text-2xl">Between sizes?</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Bandi jackets are worn over a kurta, so size up if you are between numbers or prefer room to layer. Exchanges
        are free within 7 days.
      </p>
    </div>
  );
}
