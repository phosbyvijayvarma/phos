import { Check } from 'lucide-react';
import { Reveal3D } from '@/components/motion/reveal-3d';
import { TiltCard } from '@/components/motion/tilt-card';
import { SERVICES, whatsappLink } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function ServicesSection() {
  return (
    <section id="services" className="bg-black py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal3D className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-brand">Packages</p>
          <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">Pick what fits your day</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Every package can be customised. Tap “Get a quote” and we&apos;ll reply on WhatsApp with pricing for your date.
          </p>
        </Reveal3D>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((service, index) => {
            const features = service.description.split(',').map((item) => item.trim());
            const isPremium = index === SERVICES.length - 1;

            return (
              <Reveal3D key={service.id} delay={index * 0.1} className="h-full">
                <TiltCard className="h-full rounded-3xl" maxTilt={6}>
                  <div
                    className={cn(
                      'flex h-full flex-col rounded-3xl border p-8',
                      isPremium
                        ? 'border-brand/50 bg-gradient-to-b from-brand/15 to-white/[0.02] shadow-[0_0_60px_rgba(47,155,255,0.15)]'
                        : 'border-white/10 bg-white/[0.03]',
                    )}
                  >
                    <div className="text-4xl" aria-hidden>
                      {service.icon}
                    </div>
                    <h3 className="mt-5 font-serif text-2xl text-white">{service.title}</h3>

                    <ul className="mt-6 flex-1 space-y-3">
                      {features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-sm text-white/75">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={whatsappLink(`Hi! I'd like a quote for the ${service.title}. My event date is: `)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition',
                        isPremium
                          ? 'bg-brand text-black hover:bg-brand-glow'
                          : 'border border-white/20 text-white hover:border-brand hover:text-brand-glow',
                      )}
                    >
                      Get a quote
                    </a>
                  </div>
                </TiltCard>
              </Reveal3D>
            );
          })}
        </div>

        <p className="mt-12 text-center text-white/55">
          Need something different?{' '}
          <a href="#contact" className="text-brand-glow underline decoration-brand/50 underline-offset-4 hover:text-white">
            Tell us about your event
          </a>
        </p>
      </div>
    </section>
  );
}
