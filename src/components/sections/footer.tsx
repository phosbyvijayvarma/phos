import { SITE_NAME, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const ICON_MAP = {
  Instagram: Instagram,
  Facebook: Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InShot_20250915_143819957.jpg%20%281%29-x1U8iTJpD9G3Q5zKgcndpwcKnrEMgW.jpeg"
              alt="PHOS by Vijay Varma"
              width={250}
              height={150}
              className="h-10 w-auto mb-4"
            />
            <p className="text-white/50 font-light text-sm leading-relaxed">
              Capturing universal emotions in a unique way. Cinematic wedding photography and videography with passion and discipline.
            </p>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-light mb-4 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-light mb-4 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-light mb-4 uppercase tracking-widest text-xs">Follow</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.platform as keyof typeof ICON_MAP];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors"
                    aria-label={link.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs font-light">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-white/40 text-xs font-light">
            Cinematic wedding photography &amp; visual storytelling
          </p>
        </div>
      </div>
    </footer>
  );
}
