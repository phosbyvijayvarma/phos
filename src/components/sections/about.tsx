import { ArrowRight, Clapperboard, HeartHandshake, Instagram, Sparkles } from 'lucide-react';
import { PhosMark } from '@/components/brand/phos-logo';
import { Reveal3D } from '@/components/motion/reveal-3d';
import { TiltCard } from '@/components/motion/tilt-card';
import { CONTACT, SITE_TAGLINE } from '@/lib/constants';

const VALUES = [
  {
    icon: HeartHandshake,
    title: 'Passion & Discipline',
    text: 'Serving your big day with great passion and disciplined execution.',
  },
  {
    icon: Sparkles,
    title: 'Universal Emotions',
    text: 'Capturing emotions in unique, authentic ways that resonate across time.',
  },
  {
    icon: Clapperboard,
    title: 'Cinematic Quality',
    text: 'Photography and videography with cinematic vision and technical excellence.',
  },
];

const CORNERS = [
  'left-4 top-4 border-l-2 border-t-2',
  'right-4 top-4 border-r-2 border-t-2',
  'bottom-4 left-4 border-b-2 border-l-2',
  'bottom-4 right-4 border-b-2 border-r-2',
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-black py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute left-[-15%] top-1/3 h-[60vmin] w-[60vmin] rounded-full bg-brand/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        {/* Portrait in a viewfinder frame */}
        <Reveal3D className="relative mx-auto w-full max-w-md lg:max-w-none">
          <TiltCard className="rounded-[2rem]" maxTilt={6}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 shadow-[0_40px_120px_-30px_rgba(47,155,255,0.45)]">
              <img
                src="/brand/vijay-varma-about.webp"
                width={1000}
                height={1250}
                decoding="async"
                loading="lazy"
                alt="Waist-up portrait of Vijay Varma, founder of PHOS, in a grey suit framed by a glowing blue lens ring"
                className="h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {CORNERS.map((corner) => (
                <span key={corner} aria-hidden className={`absolute h-6 w-6 border-white/70 ${corner}`} />
              ))}
              <span className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85">
                <span className="loop-blink h-1.5 w-1.5 rounded-full bg-brand-glow shadow-[0_0_8px_var(--brand)]" />
                Founder
              </span>
            </div>
          </TiltCard>

          {/* Tagline card, overlapping the frame on larger screens */}
          <div className="relative z-10 mx-4 -mt-10 flex items-center gap-4 rounded-2xl border border-brand/30 bg-[#070b14]/95 p-5 shadow-2xl shadow-black/60 sm:absolute sm:-bottom-8 sm:-right-6 sm:mx-0 sm:mt-0 sm:max-w-xs">
            <PhosMark className="h-12 w-12 shrink-0" />
            <p className="font-serif text-lg italic leading-snug text-white">&ldquo;{SITE_TAGLINE}.&rdquo;</p>
          </div>
        </Reveal3D>

        {/* Story */}
        <div>
          <Reveal3D>
            <p className="text-xs uppercase tracking-[0.4em] text-brand">Meet the founder</p>
            <h2 className="mt-4 font-serif text-5xl text-white md:text-6xl">
              Vijay{' '}
              <span className="bg-gradient-to-r from-brand-glow via-brand to-brand-deep bg-clip-text italic text-transparent">Varma</span>
            </h2>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-white/50">Photographer &amp; Filmmaker</p>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/75">
              <p>
                We are here to serve you on your big day with great passion and discipline. PHOS by Vijayvarma specializes
                in capturing universal emotions in a unique way, preserving the authentic beauty of your most significant
                moments.
              </p>
              <p>
                Our cinematic approach to photography and videography ensures every frame tells your unique love story.
                With dedication to excellence and artistic vision, we create timeless memories that will be treasured for
                generations to come.
              </p>
            </div>
          </Reveal3D>

          <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {VALUES.map(({ icon: Icon, title, text }, index) => (
              <Reveal3D key={title} delay={0.08 * index} className="h-full">
                {/* A compact row on phones, a card from tablet up. */}
                <div className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-brand/50 hover:bg-brand/5 sm:block sm:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-glow transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-widest text-white sm:mt-4">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55 sm:mt-2">{text}</p>
                  </div>
                </div>
              </Reveal3D>
            ))}
          </div>

          <Reveal3D delay={0.1} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(47,155,255,0.3)] transition-colors hover:bg-brand-glow"
            >
              Book a shoot with Vijay
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-brand hover:text-brand-glow"
            >
              <Instagram className="h-4 w-4" />
              {CONTACT.instagramHandle}
            </a>
          </Reveal3D>
        </div>
      </div>
    </section>
  );
}
