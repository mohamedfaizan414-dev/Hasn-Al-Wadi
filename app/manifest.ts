import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "Hasn Al Wadi Flour Mill LLC", short_name: "Hasn Al Wadi", start_url: "/", display: "standalone", background_color: "#faf8f2", theme_color: "#1f5d3a", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }] }; }
