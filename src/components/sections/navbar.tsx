
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SITE_NAME } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InShot_20250915_143819957.jpg%20%281%29-x1U8iTJpD9G3Q5zKgcndpwcKnrEMgW.jpeg"
            alt="PHOS by Vijay Varma"
            width={150}
            height={50}
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-light tracking-widest text-white/70 hover:text-white transition-colors duration-300 uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-l border-white/10">
              <div className="flex flex-col gap-6 mt-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-light tracking-widest text-white hover:text-white/80 transition-colors uppercase"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
