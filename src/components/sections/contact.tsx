import { useState, type FormEvent } from 'react';
import { Instagram, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { Reveal3D } from '@/components/motion/reveal-3d';
import { CONTACT, whatsappLink } from '@/lib/constants';

const EVENT_TYPES = [
  'Wedding',
  'Pre-wedding shoot',
  'Haldi / Sangeeth',
  'Engagement',
  'Baby / Kids portraits',
  'Portraits / Makeover',
  'Other event',
];

const QUICK_CONTACTS = [
  { icon: Phone, label: 'Call us', value: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Instagram, label: 'Instagram', value: CONTACT.instagramHandle, href: CONTACT.instagram, external: true },
];

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-brand focus:bg-white/[0.06] focus:ring-2 focus:ring-brand/30';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', eventType: EVENT_TYPES[0], date: '', location: '', notes: '' });

  const update = (field: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const lines = [
      `Hi PHOS! I'd like to book a shoot.`,
      `Name: ${form.name}`,
      `Event: ${form.eventType}`,
      form.date && `Date: ${form.date}`,
      form.location && `Location: ${form.location}`,
      form.notes && `Details: ${form.notes}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  const whatsappQr = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(whatsappLink())}`;

  return (
    <section id="contact" className="relative overflow-hidden bg-black py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal3D className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-brand">Book a shoot</p>
          <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">Let&apos;s capture your day</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Share a few details and we&apos;ll confirm availability and pricing on WhatsApp.
          </p>
        </Reveal3D>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Booking form */}
          <Reveal3D>
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-2 sm:p-8"
            >
              <label className="grid gap-2 text-sm text-white/70 sm:col-span-2">
                Your name
                <input required value={form.name} onChange={update('name')} placeholder="e.g. Priya & Rahul" className={inputClass} autoComplete="name" />
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                Type of event
                <select value={form.eventType} onChange={update('eventType')} className={`${inputClass} [&>option]:bg-neutral-900`}>
                  {EVENT_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                Event date
                <input type="date" value={form.date} onChange={update('date')} className={`${inputClass} [color-scheme:dark]`} />
              </label>
              <label className="grid gap-2 text-sm text-white/70 sm:col-span-2">
                Location / city
                <input value={form.location} onChange={update('location')} placeholder="Where is the event?" className={inputClass} />
              </label>
              <label className="grid gap-2 text-sm text-white/70 sm:col-span-2">
                Anything else? <span className="text-white/35">(optional)</span>
                <textarea value={form.notes} onChange={update('notes')} rows={3} placeholder="Number of days, package you like, ideas…" className={`${inputClass} resize-none`} />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 sm:col-span-2"
              >
                <Send className="h-4 w-4" />
                Send on WhatsApp
              </button>
              <p className="text-center text-xs text-white/40 sm:col-span-2">
                Opens WhatsApp with your details filled in. Nothing is sent until you tap send there.
              </p>
            </form>
          </Reveal3D>

          {/* Quick contact */}
          <Reveal3D delay={0.1} className="flex flex-col gap-4">
            {QUICK_CONTACTS.map(({ icon: Icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-brand/50 hover:bg-brand/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.2em] text-white/45">{label}</span>
                  <span className="block truncate text-white group-hover:text-brand-glow">{value}</span>
                </span>
              </a>
            ))}

            <div className="hidden flex-1 items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:flex">
              <img src={whatsappQr} alt="QR code to chat with PHOS on WhatsApp" className="h-32 w-32 rounded-xl bg-white" loading="lazy" />
              <div>
                <p className="flex items-center gap-2 text-white">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" /> On desktop?
                </p>
                <p className="mt-2 text-sm text-white/55">Scan with your phone camera to chat with us on WhatsApp.</p>
              </div>
            </div>
          </Reveal3D>
        </div>
      </div>
    </section>
  );
}
