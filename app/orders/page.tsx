"use client";
import { useEffect, useState } from "react";
import { fmt } from "@/lib/data";
import { Empty } from "@/components/Ui";
import type { Order } from "@/lib/whatsapp";
export default function Orders() {
  const [l, setL] = useState<Order[]>([]);
  useEffect(() => { try { setL(JSON.parse(localStorage.getItem("hw-orders") || "[]")); } catch {} }, []);
  if (!l.length) return <Empty title="No orders yet" text="Orders you prepare on this device appear here." href="/products" cta="Browse Products" />;
  return (<div className="max-w-2xl mx-auto space-y-3"><h1 className="text-2xl font-bold">Your orders</h1>{l.map((o) => <div key={o.orderNumber} className="card p-4"><div className="flex justify-between"><b>{o.orderNumber}</b><span className="text-sm bg-gold/30 rounded px-2">Prepared</span></div><p className="text-sm text-ink/60">{new Date(o.createdAt).toLocaleString()}</p><p>{o.lines.length} item(s) · {fmt(o.total, "To be confirmed")}</p></div>)}</div>);
}
