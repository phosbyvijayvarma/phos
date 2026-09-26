import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { useRef, type PointerEvent } from 'react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from '@/lib/portfolio-data';
import { BRAND_IMAGE, SITE_TAGLINE, whatsappLink } from '@/lib/constants';
import { ViewfinderHUD } from '@/components/motion/viewfinder-hud';

// Where the AF box rests: on Vijay's face in the brand artwork (percent of the frame).
const FACE_FOCUS = { x: 50, y: 24 };

const STATS = [
  { value: `${PORTFOLIO_CATEGORIES.length}`, label: 'Story styles' },
  { value: `${Math.floor(PORTFOLIO_IMAGES.length / 10) * 10}+`, label: 'Curated frames' },
  { value: 'Photo + Film', label: 'One team' },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const flipUp: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -60 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-1, 1], [-12, 12]), { stiffness: 90, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-1, 1], [10, -10]), { stiffness: 90, damping: 18 });
  const focusX = useMotionValue(FACE_FOCUS.x);
  const focusY = useMotionValue(FACE_FOCUS.y);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;
    px.set(relX * 2 - 1);
    py.set(relY * 2 - 1);
    focusX.set(Math.min(Math.max(relX * 100, 12), 88));
    focusY.set(Math.min(Math.max(relY * 100, 12), 82));
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`relative min-h-screen w-full overflow-hidden bg-black text-white ${isInView ? '' : 'loops-paused'}`}
    >
      {/* Atmosphere: soft blue stage light behind the portrait */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-1/2 h-[80vmin] w-[80vmin] -translate-y-1/2 rounded-full bg-brand/15 blur-[120px] lg:right-[5%]" />
        <div className="absolute left-[-10%] top-[10%] h-[40vmin] w-[40vmin] rounded-full bg-brand-deep/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-24 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-8 lg:pt-20">
        {/* Portrait logo, shown first on mobile */}
        <div
          className="relative mx-auto aspect-square w-full max-w-[min(88vw,520px)] lg:order-2"
          style={{ perspective: 1200 }}
          onPointerMove={handleMove}
          onPointerLeave={() => {
            px.set(0);
            py.set(0);
            focusX.set(FACE_FOCUS.x);
            focusY.set(FACE_FOCUS.y);
          }}
        >
          {/* Entrance and mouse tilt live on separate layers so they never fight over rotateY. */}
          <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.85, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div className="relative h-full w-full" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
              {/* Rotating lens rings, sitting behind the artwork in 3D */}
              <div aria-hidden className="absolute inset-[6%]" style={{ transform: 'translateZ(-60px)' }}>
                <div className="loop-spin h-full w-full rounded-full border border-brand/40 shadow-[0_0_60px_rgba(47,155,255,0.25),inset_0_0_40px_rgba(47,155,255,0.15)]">
                  <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-glow shadow-[0_0_16px_4px_var(--brand)]" />
                </div>
              </div>
              <div aria-hidden className="absolute inset-[1%]" style={{ transform: 'translateZ(-100px)' }}>
                <div className="loop-spin-reverse h-full w-full rounded-full border border-dashed border-white/10" />
              </div>

              <div className="relative h-full w-full" style={{ transform: 'translateZ(40px)' }}>
                <img
                  src={BRAND_IMAGE}
                  alt="Vijay Varma holding a camera gimbal above the PHOS by Vijay Varma logo"
                  width={1254}
                  height={1254}
                  className="loop-float h-full w-full select-none object-contain [mask-image:radial-gradient(circle_at_center,black_62%,transparent_72%)]"
                  draggable={false}
                />
              </div>
              <ViewfinderHUD focusX={focusX} focusY={focusY} active={isInView} />
            </motion.div>
          </motion.div>
        </div>

        {/* Copy + actions */}
        <motion.div
          className="mx-auto max-w-xl text-center lg:order-1 lg:mx-0 lg:text-left"
          variants={container}
          initial="hidden"
          animate="show"
          style={{ perspective: 800 }}
        >
          <motion.p variants={flipUp} className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-brand-glow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-glow shadow-[0_0_8px_var(--brand)]" />
            Photographer &amp; Filmmaker
          </motion.p>
          <motion.h1
            variants={flipUp}
            className="mt-6 font-serif text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl"
          >
            Wedding, Portrait &amp; Event{' '}
            <span className="bg-gradient-to-r from-brand-glow via-brand to-brand-deep bg-clip-text italic text-transparent">
              Photography
            </span>
          </motion.h1>
          <motion.p variants={flipUp} className="mt-5 text-lg text-white/75 sm:text-xl">
            {SITE_TAGLINE}
          </motion.p>
          <motion.p variants={flipUp} className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
            Cinematic storytelling for weddings, pre-wedding shoots, haldi, sangeeth, portraits and
            milestone events, captured with emotion and detail.
          </motion.p>

          <motion.div variants={flipUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              href={whatsappLink('Hi Vijay! I would like to check your availability for my event.')}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(47,155,255,0.35)] transition-colors hover:bg-brand-glow"
            >
              <MessageCircle className="h-4 w-4" />
              Check my date on WhatsApp
            </motion.a>
            <motion.a
              href="#portfolio"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              View portfolio
            </motion.a>
          </motion.div>

          <motion.dl variants={flipUp} className="mt-10 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-3 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-xl text-white sm:text-2xl">{stat.value}</dd>
                <dd className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45 sm:text-[11px]">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <a
        href="#portfolio"
        aria-label="Scroll to portfolio"
        className="loop-bob absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white/70 lg:flex"
      >
        Scroll
        <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  );
}
