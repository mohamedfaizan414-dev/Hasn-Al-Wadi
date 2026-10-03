// Central business settings. Change values here only.
export const business = {
  businessName: "Hasn Al Wadi Flour Mill LLC",
  location: "Umm Al Quwain, UAE",
  phoneNumbers: ["009715206363", "0097165355558"],
  email: "Alwadimill.Spices@gmail.com",
  // Given as supplied; NOT modified. Override via NEXT_PUBLIC_WHATSAPP_NUMBER.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "009715206363",
  currency: "AED",
  deliveryFee: 0, // configure when delivery pricing is known
  logo: "/logo.webp", // replace with the real Hasn Al Wadi logo
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
};
