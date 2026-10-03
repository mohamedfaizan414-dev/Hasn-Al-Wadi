import { business } from "@/lib/config";
export default function robots() { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${business.siteUrl}/sitemap.xml` }; }
