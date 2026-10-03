"use client";
import Link from "next/link";
import { useCart, useHydrated, priceLines } from "@/lib/cart";
import Image from "next/image";
import { fmt } from "@/lib/data";
import { Empty } from "@/components/Ui";
export default function Cart() {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCart(); const h = useHydrated();
  if (!h) return <p className="py-10 text-center">Loading cart…</p>;
  const { lines, subtotal, deliveryFee, total } = priceLines(items);
  if (!lines.length) return <Empty title="Your cart is waiting for something delicious." text="" href="/products" cta="Browse Products" />;
  return (<div className="max-w-2xl mx-auto space-y-3"><h1 className="text-2xl font-bold">Your cart</h1>
    {lines.map((l) => <div key={l.item.productId + l.item.variantId} className="card p-3 flex gap-3 items-center">
      <Image src={l.image} alt={l.name} width={64} height={64} className="w-16 h-16 rounded-xl object-cover" />
      <div className="flex-1"><p className="font-semibold">{l.name}</p><p className="text-sm text-ink/60">{l.variantName}</p>
        <div className="flex items-center gap-2 mt-1"><button className="btn btn-s !px-0 w-10 !min-h-10" aria-label="Decrease" onClick={() => decreaseQuantity(l.item.productId, l.item.variantId)}>−</button><span className="w-6 text-center font-bold">{l.item.qty}</span><button className="btn btn-p !px-0 w-10 !min-h-10" aria-label="Increase" onClick={() => increaseQuantity(l.item.productId, l.item.variantId)}>+</button></div></div>
      <div className="text-right"><p className="font-bold">{fmt(l.total, "To be confirmed")}</p><button className="text-sm underline py-2" onClick={() => removeItem(l.item.productId, l.item.variantId)}>Remove</button></div></div>)}
    <div className="card p-4 space-y-1"><div className="flex justify-between"><span>Subtotal</span><span>{fmt(subtotal, "To be confirmed")}</span></div><div className="flex justify-between"><span>Delivery</span><span>{fmt(deliveryFee)}</span></div><div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span>{fmt(total, "To be confirmed")}</span></div></div>
    <Link href="/checkout" className="btn btn-p w-full">Proceed to Checkout</Link></div>);
}
