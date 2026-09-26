import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { PhosLogo } from '@/components/brand/phos-logo';
import { CONTACT, whatsappLink } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Films', href: '#videos' },
  { label: 'About', href: '#about' },
  { label: 'Packages', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const SECTION_IDS = ['home', ...NAV_LINKS.map((link) => link.href.slice(1))];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-[background-color,border-color] duration-300 ${
        isScrolled ? 'border-b border-white/10 bg-black/95 sm:bg-black/80 sm:backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="text-[34px]" aria-label="PHOS by Vijay Varma, back to top">
          <PhosLogo />
        </a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-brand shadow-[0_0_8px_var(--brand)]"
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden min-h-10 items-center rounded-full bg-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-black shadow-[0_0_24px_rgba(47,155,255,0.35)] transition hover:bg-brand-glow sm:inline-flex"
          >
            Book Now
          </a>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-11 w-11 text-white hover:bg-white/10 hover:text-white" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col border-l border-white/10 bg-black px-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="mt-6 text-[40px]">
                  <PhosLogo withByline />
                </div>
                <div className="mt-10 flex flex-col">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`border-b border-white/10 py-4 text-base uppercase tracking-widest transition-colors ${
                        active === link.href.slice(1) ? 'text-brand' : 'text-white hover:text-white/80'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="mt-auto grid grid-cols-2 gap-3 pb-8">
                  <a
                    href={CONTACT.phoneHref}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-xs uppercase tracking-widest text-white"
                  >
                    <Phone className="h-4 w-4" /> Call
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-xs font-semibold uppercase tracking-widest text-black"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
