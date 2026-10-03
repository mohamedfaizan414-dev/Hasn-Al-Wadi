# Hasn Al Wadi – Mobile-first store
`npm install && npm run dev` · build: `npm run build`
- Products: `lib/data.ts` (9 real products from supplied photos). Pack sizes and prices were NOT supplied: set `price` (AED) and variant `name` there. While price is null the site shows "Price on request" and WhatsApp orders say "To be confirmed".
- Images: `public/products/*.webp` (native photo resolution), `public/banner.webp`, `public/logo.webp` (crop from pack photo – replace with the vector logo).
- Business settings: `lib/config.ts`. WhatsApp number: set `NEXT_PUBLIC_WHATSAPP_NUMBER` (see `.env.example`).
