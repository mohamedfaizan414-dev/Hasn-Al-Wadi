"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fmt } from "@/lib/data";
import { createWhatsAppUrl, generateOrderMessage, whatsappNumber, type Order } from "@/lib/whatsapp";
export default function Success() {
  const [o, setO] = useState<Order | null>(null);
  useEffect(() => { try { setO(JSON.parse(localStorage.getItem("hw-last") || "null")); } catch {} }, []);
  if (!o) return <div className="text-center py-16"><p>No recent order found.</p><Link href="/products" className="btn btn-p mt-3">Browse Products</Link></div>;
  const wa = whatsappNumber();
  return (<div className="max-w-xl mx-auto space-y-4 text-center"><h1 className="text-3xl font-bold text-brand">Order Ready!</h1>
    <p>Your order details have been prepared in WhatsApp. Please send the message to complete your order.</p>
    <p className="text-sm bg-gold/20 rounded-xl p-2">Status: order prepared — not yet confirmed. We confirm after receiving your WhatsApp message.</p>
    <div className="card p-4 text-left text-sm space-y-1"><p className="font-bold">Ref: {o.orderNumber}</p><p>{o.customerName} · {o.phone}</p><p>{o.address}, {o.area}</p>
      {o.lines.map((l, i) => <p key={i}>{l.name} — {l.variantName} × {l.item.qty} · {fmt(l.total, "To be confirmed")}</p>)}<p className="font-bold">Total {fmt(o.total, "To be confirmed")}</p></div>
    <div className="flex flex-col sm:flex-row gap-2 justify-center">{wa && <a className="btn btn-p" href={createWhatsAppUrl(wa, generateOrderMessage(o))} target="_blank" rel="noreferrer">Open WhatsApp</a>}<Link className="btn btn-s" href="/products">Continue Shopping</Link></div></div>);
}
