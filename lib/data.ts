import blur from "./blur.json";
export type Stock = "IN_STOCK" | "OUT_OF_STOCK";
export type Variant = { id: string; name: string; weight: number; price: number | null; sku: string; stockStatus: Stock };
export type Category = { id: string; name: string; slug: string; description: string; icon: string };
export type Product = { id: string; name: string; slug: string; category: string; description: string; highlights: string[]; usage: string; keywords: string[]; image: string; blur: string; variants: Variant[]; unit: string; featured: boolean; active: boolean };

const allCategories: Category[] = [
  { id: "rice", name: "Rice", slug: "rice", description: "Everyday rice", icon: "🍚" },
  { id: "flour", name: "Flour", slug: "flour", description: "Milled flour products", icon: "🌾" },
  { id: "spices", name: "Spices", slug: "spices", description: "Whole & ground spices", icon: "🌶️" },
  { id: "pulses", name: "Pulses", slug: "pulses", description: "Lentils & split pulses", icon: "🫘" },
  { id: "sugar", name: "Sugar", slug: "sugar", description: "", icon: "🧂" },
  { id: "oil", name: "Oil", slug: "oil", description: "", icon: "🫒" },
  { id: "nuts", name: "Nuts", slug: "nuts", description: "", icon: "🥜" },
];

// REAL PRODUCT RANGE (from supplied photos). Pack sizes and prices were not supplied:
// set `price` (AED) and variant `name`/`weight` below. While price is null the store shows
// "Price on request" and the WhatsApp message says the price is to be confirmed.
const mk = (id: string, name: string, category: string, description: string, highlights: string[], usage: string, keywords: string[], featured = true): Product => ({
  id, name, slug: id, category, description, highlights, usage, keywords, featured, active: true, unit: "pack",
  image: `/products/${id}.webp`, blur: (blur as Record<string, string>)[id],
  variants: [{ id: `${id}-std`, name: "Standard pack", weight: 0, price: null, sku: id.toUpperCase(), stockStatus: "IN_STOCK" }],
});

export const products: Product[] = [
  mk("white-rice", "Al Wadi White Rice", "rice", "Clean, long white rice grains packed in a clear pouch so you can see exactly what you are buying. A dependable pantry staple for daily family meals, big gatherings and everything in between.", ["Premium grade", "100% Natural", "Clear window pack"], "Rinse well, soak briefly and cook until fluffy. Ideal for plain steamed rice, pilafs and fried rice. Store sealed in a cool, dry place.", ["rice", "white rice", "grain"]),
  mk("semolina", "Al Wadi Semolina", "flour", "Fine, golden-cream milled semolina with a soft, even grain, produced by Hasn Al Wadi Flour Mill. A versatile kitchen essential for both sweet and savoury cooking.", ["Premium grade", "100% Natural", "Milled by Hasn Al Wadi"], "Use for upma, halwa, puddings, cakes, couscous-style dishes and to add crunch to bread and pastry. Keep in an airtight container away from moisture.", ["semolina", "suji", "rava", "flour", "wheat"]),
  mk("red-lentils", "Al Wadi Red Lentils", "pulses", "Bright orange split red lentils that cook quickly and break down into a smooth, comforting texture. Packed to show off their colour and quality.", ["Premium grade", "100% Natural", "Quick cooking"], "Rinse and simmer for soups, dal, stews and purees; no long soaking needed. Store sealed in a cool, dry place.", ["lentil", "lentils", "masoor", "dal", "red"]),
  mk("chana-dal", "Al Wadi Split Chickpeas (Chana Dal)", "pulses", "Golden-yellow split pulses with a hearty bite and nutty flavour, cleaned and packed for everyday cooking.", ["Premium grade", "100% Natural", "High-visibility pouch"], "Soak for an hour or two, then simmer for dal, curries, fritter batter and savoury stuffings. Keep airtight and dry.", ["chana", "dal", "split", "chickpea", "yellow"]),
  mk("cardamom", "Al Wadi Green Cardamom", "spices", "Whole green cardamom pods with a sweet, floral aroma. A signature spice for Arabic coffee, tea, rice dishes and desserts.", ["Premium grade", "100% Natural", "Whole pods"], "Lightly crush the pods into coffee or tea, or add whole to rice, stews and sweets. Reseal the pack after use to keep the aroma.", ["cardamom", "elaichi", "hail", "green", "whole spice"]),
  mk("black-pepper", "Al Wadi Black Peppercorns", "spices", "Whole black peppercorns with a bold, warm bite. Grind fresh for the fullest flavour in any dish.", ["Premium grade", "100% Natural", "Whole peppercorns"], "Grind over soups, grills, salads and sauces, or add whole to stocks and rice. Store sealed away from light.", ["pepper", "black pepper", "peppercorn", "whole spice"]),
  mk("chilli-powder", "Al Wadi Red Chilli Powder", "spices", "Vibrant ground red chilli that brings colour and heat to curries, marinades and sauces.", ["Premium grade", "100% Natural", "Ground spice"], "Add by the pinch to curries, rubs and marinades, adjusting to your preferred heat. Keep tightly closed in a dry place.", ["chilli", "chili", "red chilli", "powder", "hot"]),
  mk("coriander-powder", "Al Wadi Coriander Powder", "spices", "Finely ground coriander with a mild, citrusy-earthy aroma that forms the base of countless spice blends.", ["Premium grade", "100% Natural", "Ground spice"], "Stir into curries, lentil dishes, marinades and spice mixes. Seal after use and store in a cool, dry cupboard.", ["coriander", "dhania", "powder"]),
  mk("turmeric-powder", "Al Wadi Turmeric Powder", "spices", "Deep golden turmeric powder that gives dishes a rich colour and warm, earthy flavour.", ["Premium grade", "100% Natural", "Ground spice"], "Use in rice, curries, soups and marinades. Keep sealed away from moisture; it can stain, so handle with care.", ["turmeric", "haldi", "powder", "yellow"]),
];

export const categories = allCategories.filter((c) => products.some((p) => p.category === c.id)); // empty categories are hidden
export const categoryImage = (id: string) => products.find((p) => p.category === id)?.image ?? "/products/white-rice.webp";
export const getProduct = (slug: string) => products.find((p) => p.slug === slug && p.active);
export const getVariant = (p: Product, id: string) => p.variants.find((x) => x.id === id) ?? p.variants[0];
export const catName = (id: string) => allCategories.find((c) => c.id === id)?.name ?? id;
export const fmt = (n: number | null, alt = "Price on request") => (n == null ? alt : `AED ${n.toFixed(2)}`);
export const bannerBlur = (blur as Record<string, string>).banner;
