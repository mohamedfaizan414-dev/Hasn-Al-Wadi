import { business } from "@/lib/config";
import { products } from "@/lib/data";
export default function sitemap() { const b = business.siteUrl; return ["", "/products", "/contact"].map((p) => ({ url: b + p })).concat(products.map((p) => ({ url: `${b}/product/${p.slug}` }))); }
