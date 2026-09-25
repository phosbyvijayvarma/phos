import { CONTACT, FOOTER_LINKS, SITE_NAME, SOCIAL_LINKS, SITE_TAGLINE } from '@/lib/constants';
import { Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from 'lucide-react';
import { PhosLogo } from '@/components/brand/phos-logo';

const ICON_MAP = {
  Instagram: Instagram,
  Facebook: Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs uppercase tracking-widest text-white">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-sm text-white/50 transition-colors hover:text-brand-glow">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pb-24 pt-16 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="inline-block text-[44px]" aria-label="Back to top">
              <PhosLogo withByline />
            </a>
            <p className="mt-6 text-sm leading-relaxed text-white/50">{SITE_TAGLINE}.</p>
          </div>

          <LinkColumn title="Explore" links={FOOTER_LINKS.explore} />
          <LinkColumn title="Studio" links={FOOTER_LINKS.company} />

          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-4 text-xs uppercase tracking-widest text-white">Get in touch</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-2 text-white/50 hover:text-brand-glow">
                  <Phone className="h-4 w-4" /> {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 break-all text-white/50 hover:text-brand-glow">
                  <Mail className="h-4 w-4 shrink-0" /> {CONTACT.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.platform as keyof typeof ICON_MAP];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-brand hover:text-brand-glow"
                    aria-label={link.platform}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p>Cinematic wedding photography &amp; visual storytelling</p>
        </div>
      </div>
    </footer>
  );
}
