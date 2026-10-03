import { business } from "./config";
import type { Line } from "./cart";

export type Order = { orderNumber: string; customerName: string; phone: string; address: string; area: string; notes: string; lines: Line[]; subtotal: number | null; deliveryFee: number; total: number | null; status: "PENDING"; createdAt: string };

/**
 * Normalises international WhatsApp numbers to the digits wa.me expects.
 * Accept any E.164-length number so local development and testing are not tied
 * to a particular country's telephone plan.
 */
export function validateWhatsApp(raw: string): string | null {
  let d = raw.trim().replace(/[^\d]/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  return /^[1-9]\d{6,14}$/.test(d) ? d : null;
}
export const whatsappNumber = () => validateWhatsApp(business.whatsappNumber);
const aed = (n: number | null) => (n == null ? "To be confirmed" : `AED ${n.toFixed(2)}`);
export function generateOrderMessage(o: Order) {
  const items = o.lines.map((l, i) => `${i + 1}. ${l.name}\n   Variant: ${l.variantName}\n   Quantity: ${l.item.qty}\n   Price: ${aed(l.total)}`).join("\n\n");
  return `NEW ORDER — ${business.businessName.toUpperCase()}\nRef: ${o.orderNumber}\n\nCustomer:\n${o.customerName}\n\nPhone:\n${o.phone}\n\nDelivery Address:\n${o.address}\n\nArea:\n${o.area}\n\nORDER ITEMS:\n\n${items}\n\nSubtotal:\n${aed(o.subtotal)}\n\nDelivery:\n${aed(o.deliveryFee)}\n\nTOTAL:\n${aed(o.total)}\n\nNotes:\n${o.notes || "-"}\n\nPlease confirm this order.`;
}
export const createWhatsAppUrl = (num: string, msg: string) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
export function newOrderNumber() {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `HW-${d}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
