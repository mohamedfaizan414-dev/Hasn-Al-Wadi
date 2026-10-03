import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header, BottomNav, Footer } from "@/components/Ui";
import { business } from "@/lib/config";
import Reg from "@/components/Reg";
import Splash from "@/components/Splash";

const desc = "Shop rice, flour, sugar, spices, nuts, oils and pulses from Hasn Al Wadi Flour Mill LLC in Umm Al Quwain, UAE.";
const title = "Hasn Al Wadi Flour Mill LLC | Rice, Flour, Spices, Sugar & More";
export const metadata: Metadata = { metadataBase: new URL(business.siteUrl), title, description: desc, alternates: { canonical: "/" }, manifest: "/manifest.webmanifest",
  openGraph: { title, description: desc, type: "website", siteName: business.businessName }, twitter: { card: "summary", title, description: desc }, icons: { icon: [{ url: "/app-icon-192.png", sizes: "192x192", type: "image/png" }, { url: "/app-icon-512.png", sizes: "512x512", type: "image/png" }], apple: [{ url: "/app-icon-192.png", sizes: "192x192", type: "image/png" }] } };
export const viewport: Viewport = { themeColor: "#1f5d3a", width: "device-width", initialScale: 1 };
const ld = { "@context": "https://schema.org", "@type": "Organization", name: business.businessName, email: business.email, telephone: business.phoneNumbers, address: { "@type": "PostalAddress", addressLocality: "Umm Al Quwain", addressCountry: "AE" } };
export default function Root({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><noscript><style>{".splash{display:none}"}</style></noscript><Splash /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <Header /><main className="shell pt-7 pb-24 md:pt-10 md:pb-10 min-h-[70vh]">{children}</main><Footer /><BottomNav /><Reg /></body></html>);
}
