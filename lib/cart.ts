"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import { business } from "./config";
import { products, getVariant } from "./data";

export type CartItem = { productId: string; variantId: string; qty: number };
type S = { items: CartItem[]; addItem: (p: string, v: string, q?: number) => void; removeItem: (p: string, v: string) => void; increaseQuantity: (p: string, v: string) => void; decreaseQuantity: (p: string, v: string) => void; clearCart: () => void };
const same = (a: CartItem, p: string, v: string) => a.productId === p && a.variantId === v;

export const useCart = create<S>()(persist((set) => ({
  items: [],
  addItem: (p, v, q = 1) => set((s) => s.items.some((i) => same(i, p, v)) ? { items: s.items.map((i) => same(i, p, v) ? { ...i, qty: i.qty + q } : i) } : { items: [...s.items, { productId: p, variantId: v, qty: q }] }),
  removeItem: (p, v) => set((s) => ({ items: s.items.filter((i) => !same(i, p, v)) })),
  increaseQuantity: (p, v) => set((s) => ({ items: s.items.map((i) => same(i, p, v) ? { ...i, qty: i.qty + 1 } : i) })),
  decreaseQuantity: (p, v) => set((s) => ({ items: s.items.flatMap((i) => same(i, p, v) ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]) })),
  clearCart: () => set({ items: [] }),
}), { name: "hw-cart" }));

export function useHydrated() { const [h, s] = useState(false); useEffect(() => s(true), []); return h; }

export type Line = { item: CartItem; name: string; image: string; variantName: string; unitPrice: number | null; total: number | null };
export function priceLines(items: CartItem[]) {
  const lines: Line[] = [];
  for (const item of items) {
    const p = products.find((x) => x.id === item.productId); if (!p) continue;
    const v = getVariant(p, item.variantId);
    lines.push({ item, name: p.name, image: p.image, variantName: v.name, unitPrice: v.price, total: v.price == null ? null : v.price * item.qty });
  }
  const priced = lines.every((l) => l.total != null);
  const subtotal = priced ? lines.reduce((a, l) => a + (l.total ?? 0), 0) : null;
  const deliveryFee = lines.length ? business.deliveryFee : 0;
  return { lines, priced, subtotal, deliveryFee, total: subtotal == null ? null : subtotal + deliveryFee };
}
