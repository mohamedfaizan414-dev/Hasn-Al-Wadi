import { business } from "@/lib/config";
import { createWhatsAppUrl, whatsappNumber } from "@/lib/whatsapp";
import { Icon } from "@/components/Ui";
export const metadata = { title: `Contact | ${business.businessName}`, alternates: { canonical: "/contact" } };
export default function Contact() {
  const wa = whatsappNumber();
  return (<div className="max-w-2xl mx-auto space-y-5"><p className="eyebrow">Get in touch</p><h1 className="text-4xl font-bold">We are here to help.</h1>
    <p className="leading-relaxed text-ink/70">{business.businessName} provides essential pantry products for homes and kitchens across Umm Al Quwain and the surrounding UAE market.</p>
    <div className="card p-5 space-y-4"><p className="font-bold text-lg">{business.businessName}</p><p className="text-ink/70">{business.location}</p>
      <div className="grid gap-2">{business.phoneNumbers.map((p) => <a key={p} className="btn btn-p" href={`tel:${p}`}><Icon name="phone" size={17}/> Call {p}</a>)}
        <a className="btn btn-s" href={`mailto:${business.email}`}><Icon name="mail" size={17}/> {business.email}</a>
        {wa ? <a className="btn btn-g" href={createWhatsAppUrl(wa, "Hello, I would like to enquire about your products.")} target="_blank" rel="noreferrer">WhatsApp</a> : <p className="text-sm text-ink/60">WhatsApp number not configured yet.</p>}</div></div></div>);
}
