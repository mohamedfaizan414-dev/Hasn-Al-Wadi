import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/data";
import Detail from "./Detail";
import { ProductCard } from "@/components/Ui";
import { business } from "@/lib/config";
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) { const p = getProduct(params.slug); return p ? { title: `${p.name} | ${business.businessName}`, description: p.description, alternates: { canonical: `/product/${p.slug}` } } : {}; }
export default function Page({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug); if (!p) notFound();
  const rel = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const ld = { "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, category: p.category };
  return (<div className="space-y-8"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /><Detail p={p} />
    {rel.length > 0 && <section className="related-products"><p className="eyebrow mb-2">You may also like</p><h2>More from {p.category}</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">{rel.map((r) => <ProductCard key={r.id} p={r} />)}</div></section>}</div>);
}
