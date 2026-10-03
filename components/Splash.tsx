"use client";
import { useEffect, useState } from "react";
import { business } from "@/lib/config";
export default function Splash() {
  const [s, setS] = useState<"show" | "hide" | "gone">("show");
  useEffect(() => {
    let seen = false; try { seen = !!sessionStorage.getItem("hw-splash"); } catch {}
    if (seen) { setS("gone"); return; }
    const a = setTimeout(() => setS("hide"), 1900);
    const b = setTimeout(() => { setS("gone"); try { sessionStorage.setItem("hw-splash", "1"); } catch {} }, 2450);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  if (s === "gone") return null;
  return (<div className={`splash ${s === "hide" ? "splash-out" : ""}`} aria-hidden="true">
    <div className="splash-wrap"><img src={business.logo} alt="" width={455} height={205} /></div>
    <p className="font-semibold tracking-wide">{business.businessName}</p>
    <p className="text-sm text-white/70 -mt-3">We believe in Better Health</p>
    <div className="splash-bar"><i /></div></div>);
}
