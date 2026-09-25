import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useReducedMotion, useSpring, type MotionValue } from 'framer-motion';

interface ViewfinderHUDProps {
  /** Focus point in percent of the frame (0-100). */
  focusX: MotionValue<number>;
  focusY: MotionValue<number>;
}

const FPS = 24;

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-7 w-7 border-white/70 ${className}`} />;
}

/** Camera viewfinder overlay: frame corners, REC timecode, exposure readout and a tracking AF box. */
export function ViewfinderHUD({ focusX, focusY }: ViewfinderHUDProps) {
  const reduceMotion = useReducedMotion();
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const x = useSpring(focusX, { stiffness: 120, damping: 18 });
  const y = useSpring(focusY, { stiffness: 120, damping: 18 });
  const left = useMotionTemplate`${x}%`;
  const top = useMotionTemplate`${y}%`;

  useAnimationFrame((time) => {
    if (!timecodeRef.current) return;
    const totalFrames = Math.floor((time / 1000) * FPS);
    const frames = totalFrames % FPS;
    const seconds = Math.floor(totalFrames / FPS);
    const pad = (n: number) => String(n).padStart(2, '0');
    timecodeRef.current.textContent = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}:${pad(frames)}`;
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-[7%] font-mono text-[10px] tracking-widest text-white/80 sm:text-[11px]" style={{ transform: 'translateZ(70px)' }}>
      <Corner className="left-0 top-0 border-l-2 border-t-2" />
      <Corner className="right-0 top-0 border-r-2 border-t-2" />
      <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
      <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

      <div className="absolute left-3 top-3 flex items-center gap-2">
        <motion.span
          className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]"
          animate={reduceMotion ? undefined : { opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        REC <span ref={timecodeRef} className="text-white/60">00:00:00:00</span>
      </div>
      <div className="absolute right-3 top-3 flex items-center gap-2 text-white/60">
        4K · 24P
        <span className="flex h-2.5 w-5 items-center gap-px rounded-[2px] border border-white/60 p-px">
          <span className="h-full flex-1 bg-brand-glow" />
          <span className="h-full flex-1 bg-brand-glow" />
          <span className="h-full flex-1 bg-brand-glow/30" />
        </span>
      </div>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-4 whitespace-nowrap text-white/60">
        <span>ISO 400</span>
        <span className="text-brand-glow">f/1.8</span>
        <span>1/250</span>
      </div>

      {/* Autofocus box that follows the cursor */}
      <motion.div className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
        <motion.div
          className="h-full w-full border border-brand-glow shadow-[0_0_12px_rgba(47,155,255,0.6)]"
          animate={reduceMotion ? undefined : { scale: [1, 0.86, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="absolute -top-4 left-0 text-[9px] text-brand-glow">AF-C ●</span>
      </motion.div>
    </div>
  );
}
