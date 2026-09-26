import { useRef, type RefObject } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from '@/lib/portfolio-data';
import { getImageInfo } from '@/lib/images';

const FRAMES_PER_STRIP = 7;

// A few frames from each story so both strips show variety.
function pickFrames(offset: number) {
  return PORTFOLIO_CATEGORIES.map((category) => {
    const images = PORTFOLIO_IMAGES.filter((img) => img.category === category.id);
    return images[(offset * 3 + 2) % images.length];
  })
    .filter(Boolean)
    .slice(0, FRAMES_PER_STRIP);
}

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

interface StripProps {
  frames: typeof PORTFOLIO_IMAGES;
  baseSpeed: number;
  className: string;
  frameOffset: number;
  sectionRef: RefObject<HTMLElement>;
}

/** A strip of 35mm film that drifts sideways and speeds up (or reverses) with scroll velocity. */
function Strip({ frames, baseSpeed, className, frameOffset, sectionRef }: StripProps) {
  const reduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { margin: '100px' });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !isInView) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    const moveBy = direction.current * baseSpeed * (delta / 1000) * (1 + Math.abs(factor));
    baseX.set(baseX.get() + moveBy);
  });

  const doubled = [...frames, ...frames];

  return (
    <div className={`absolute left-[-10%] w-[120%] bg-[#0b0b0d] py-5 shadow-[0_30px_60px_rgba(0,0,0,0.7)] ${className}`}>
      {/* Sprocket holes */}
      <div className="absolute inset-x-0 top-1.5 h-2.5 bg-[repeating-linear-gradient(90deg,transparent_0_10px,rgba(255,255,255,0.85)_10px_22px,transparent_22px_32px)] opacity-80" />
      <div className="absolute inset-x-0 bottom-1.5 h-2.5 bg-[repeating-linear-gradient(90deg,transparent_0_10px,rgba(255,255,255,0.85)_10px_22px,transparent_22px_32px)] opacity-80" />

      <motion.div className="flex w-max gap-3" style={{ x, willChange: 'transform' }}>
        {doubled.map((image, index) => (
          <div key={`${image.id}-${index}`} className="relative h-32 w-48 shrink-0 overflow-hidden rounded-[3px] sm:h-40 sm:w-60">
            <img src={getImageInfo(image.src).thumb} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <span className="absolute bottom-1 left-2 font-mono text-[9px] tracking-widest text-orange-300/90">
              {((index % frames.length) + frameOffset).toString().padStart(2, '0')}
              <span className="ml-1">▸</span>
            </span>
          </div>
        ))}
      </motion.div>

      <span className="absolute -top-0.5 left-[12%] font-mono text-[8px] tracking-[0.4em] text-orange-300/70">PHOS 400</span>
      <span className="absolute -bottom-0.5 right-[18%] font-mono text-[8px] tracking-[0.4em] text-orange-300/70">SAFETY FILM</span>
    </div>
  );
}

/** Two crossing strips of film between sections, tilted in 3D. */
export function FilmStripSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} aria-label="Film strip of recent work" className="relative h-[340px] overflow-hidden bg-black sm:h-[420px]" style={{ perspective: 1200 }}>
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(18deg)' }}>
        <Strip sectionRef={sectionRef} frames={pickFrames(0)} baseSpeed={-2} frameOffset={1} className="top-[14%] -rotate-[5deg]" />
        <Strip sectionRef={sectionRef} frames={pickFrames(1)} baseSpeed={1.5} frameOffset={24} className="top-[46%] rotate-[4deg]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,black,transparent_15%,transparent_85%,black)]" />
    </section>
  );
}
