"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, useHydrated, priceLines } from "@/lib/cart";
import { fmt } from "@/lib/data";
import { business } from "@/lib/config";
import { Empty } from "@/components/Ui";
import { createWhatsAppUrl, generateOrderMessage, newOrderNumber, whatsappNumber, type Order } from "@/lib/whatsapp";

const KEY = "hw-checkout";
export default function Checkout() {
  const { items, clearCart } = useCart(); const h = useHydrated(); const r = useRouter();
  const [f, setF] = useState({ name: "", phone: "", address: "", area: "", notes: "" }); const [err, setErr] = useState<Record<string, string>>({});
  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setF(JSON.parse(s)); } catch {} }, []);
  const set = (k: string, v: string) => { const n = { ...f, [k]: v }; setF(n); try { localStorage.setItem(KEY, JSON.stringify(n)); } catch {} };
  if (!h) return <p className="py-10 text-center">Loading…</p>;
  const { lines, subtotal, deliveryFee, total } = priceLines(items);
  if (!lines.length) return <Empty title="Your cart is empty" text="" href="/products" cta="Browse Products" />;
  const wa = whatsappNumber();
  const submit = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\+?[\d\s-]{7,15}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
    if (f.address.trim().length < 5) e.address = "Please enter your delivery address.";
    if (!f.area.trim()) e.area = "Please enter your area.";
    setErr(e); if (Object.keys(e).length || !wa) return;
    const o: Order = { orderNumber: newOrderNumber(), customerName: f.name.trim(), phone: f.phone.trim(), address: f.address.trim(), area: f.area.trim(), notes: f.notes.trim(), lines, subtotal, deliveryFee, total, status: "PENDING", createdAt: new Date().toISOString() };
    try { const L = JSON.parse(localStorage.getItem("hw-orders") || "[]"); localStorage.setItem("hw-orders", JSON.stringify([o, ...L].slice(0, 30))); localStorage.setItem("hw-last", JSON.stringify(o)); } catch {}
    window.open(createWhatsAppUrl(wa, generateOrderMessage(o)), "_blank");
    clearCart(); r.push("/success");
  };
  const fld = (k: keyof typeof f, label: string, type = "text") => (<div><label htmlFor={k} className="block text-sm font-medium mb-1">{label}</label>
    {k === "address" || k === "notes" ? <textarea id={k} className="inp py-3" rows={k === "address" ? 3 : 2} value={f[k]} onChange={(e) => set(k, e.target.value)} aria-invalid={!!err[k]} />
      : <input id={k} type={type} className="inp" value={f[k]} onChange={(e) => set(k, e.target.value)} aria-invalid={!!err[k]} autoComplete={k === "name" ? "name" : k === "phone" ? "tel" : "off"} />}
    {err[k] && <p className="text-red-700 text-sm mt-1" role="alert">{err[k]}</p>}</div>);
  return (<div className="max-w-2xl mx-auto space-y-4"><h1 className="text-2xl font-bold">Checkout</h1>
    <div className="card p-4 space-y-3">{fld("name", "Full name")}{fld("phone", "Phone number", "tel")}{fld("address", "Delivery address")}{fld("area", "Area")}{fld("notes", "Notes (optional)")}</div>
    <div className="card p-4"><h2 className="font-bold mb-2">Order summary</h2>{lines.map((l) => <div key={l.item.productId + l.item.variantId} className="flex justify-between text-sm py-1"><span>{l.name} — {l.variantName} × {l.item.qty}</span><span>{fmt(l.total, "To be confirmed")}</span></div>)}
      <div className="flex justify-between text-sm pt-1"><span>Delivery</span><span>{fmt(deliveryFee)}</span></div><div className="flex justify-between font-bold text-lg border-t mt-2 pt-2"><span>Total</span><span>{fmt(total, "To be confirmed")}</span></div></div>
    {!wa && <div role="alert" className="bg-red-50 text-red-800 rounded-xl p-3 text-sm">WhatsApp ordering is not configured. Enter a valid international number, including its country code (for example, 971…, 91…, or 1…).</div>}
    <button className="btn btn-p w-full" disabled={!wa} onClick={submit}>PLACE ORDER ON WHATSAPP</button></div>);
}
