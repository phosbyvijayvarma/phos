
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, MessageCircle, Clock, CalendarDays, Sparkles } from 'lucide-react';

export function ContactSection() {
  const whatsappNumber = '917799558146';
  const whatsappMessage = 'Hi! I am interested in booking your photography services. My event date is [your date], and I would like more details.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const whatsappQr = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(whatsappUrl)}`;

  return (
    <section id="contact" className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-light text-white mb-6 tracking-wider">
            Book Your Shoot
          </h2>
          <p className="text-sm text-white/50 font-light uppercase tracking-widest">
            Secure your date with PHOS BY VIJAYVARMA and capture every emotion in timeless frames.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Booking Details */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-serif font-light text-white mb-4 tracking-wider">Booking Details</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Start with a quick message on WhatsApp and we&apos;ll guide you through availability, pricing, and creative planning.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CalendarDays className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-light uppercase tracking-widest mb-2">Available Events</p>
                  <p className="text-white/70 font-light leading-relaxed">
                    Weddings, pre-wedding shoots, engagements, portraits, corporate events, and special ceremonies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-light uppercase tracking-widest mb-2">Booking Process</p>
                  <p className="text-white/70 font-light leading-relaxed">
                    Send your event date, location, and photography needs. We&apos;ll share a tailored proposal and confirm availability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-light uppercase tracking-widest mb-2">What We Include</p>
                  <p className="text-white/70 font-light leading-relaxed">
                    Cinematic storytelling, full-day coverage, premium editing, and optional album design for unforgettable keepsakes.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-8 pt-6 border-t border-white/10">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-light uppercase tracking-widest mb-2">Email</p>
                  <a href="mailto:phosbyvijayvarma@gmail.com" className="text-white/70 hover:text-white transition-colors font-light">
                    phosbyvijayvarma@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-light uppercase tracking-widest mb-2">Phone</p>
                  <a href="tel:+917799558146" className="text-white/70 hover:text-white transition-colors font-light">
                    +91 7799558146
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-light uppercase tracking-widest mb-2">Follow Us</p>
                  <a href="https://www.instagram.com/phos_by__vijayvarma" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors font-light">
                    @phos_by__vijayvarma
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp QR Panel */}
          <div className="flex flex-col justify-center">
            <div className="bg-white/5 border border-white/20 p-10 rounded-none">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-green-600/20 border border-green-600/50 rounded-full">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <h3 className="text-2xl font-serif font-light text-white text-center mb-4 tracking-wider">
                Book via WhatsApp
              </h3>

              <p className="text-white/60 font-light text-center mb-8 leading-relaxed">
                Scan the QR code or tap the button to send us a booking message instantly.
              </p>

              <div className="mx-auto mb-8 w-[260px]">
                <img
                  src={whatsappQr}
                  alt="WhatsApp booking QR code"
                  className="w-full h-auto rounded-3xl border border-white/10 bg-slate-950"
                />
              </div>

              <div className="text-center mb-8">
                <p className="text-white/40 text-xs font-light uppercase tracking-widest mb-3">Scan to Message</p>
                <p className="text-white/70 text-sm font-light">
                  Point your phone camera at the QR code to open WhatsApp and start a booking conversation.
                </p>
              </div>

              <Button
                asChild
                className="w-full bg-green-600 hover:bg-green-700 text-white font-light py-3 rounded-none transition-smooth uppercase tracking-wider text-sm"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Send Booking Message
                </a>
              </Button>

              <p className="text-white/40 text-xs text-center font-light mt-6">
                Please send your event date, location, and type of photography needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
