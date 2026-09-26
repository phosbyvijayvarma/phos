import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useSpring, type MotionValue } from 'framer-motion';

interface ViewfinderHUDProps {
  /** Focus point in percent of the frame (0-100). */
  focusX: MotionValue<number>;
  focusY: MotionValue<number>;
  /** Pause the timecode when the HUD is off screen. */
  active?: boolean;
}

const FPS = 24;

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-7 w-7 border-white/70 ${className}`} />;
}

/** Camera viewfinder overlay: frame corners, REC timecode, exposure readout and a tracking AF box. */
export function ViewfinderHUD({ focusX, focusY, active = true }: ViewfinderHUDProps) {
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const lastFrame = useRef(-1);
  const x = useSpring(focusX, { stiffness: 120, damping: 18 });
  const y = useSpring(focusY, { stiffness: 120, damping: 18 });
  // Translating a frame-sized layer by N% of itself moves the box to N% of the frame, transform-only.
  const layerX = useMotionTemplate`${x}%`;
  const layerY = useMotionTemplate`${y}%`;

  useAnimationFrame((time) => {
    if (!active || !timecodeRef.current) return;
    const totalFrames = Math.floor((time / 1000) * FPS);
    // Only touch the DOM when the frame number changes (24x a second, not every refresh).
    if (totalFrames === lastFrame.current) return;
    lastFrame.current = totalFrames;
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
        <span className="loop-blink h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
        REC <span ref={timecodeRef} className="tabular-nums text-white/60">00:00:00:00</span>
      </div>
      <div className="absolute right-3 top-3 flex items-center gap-2 text-white/60">
        <span className="hidden sm:inline">4K · 24P</span>
        <span className="flex h-2.5 w-5 items-center gap-px rounded-[2px] border border-white/60 p-px">
          <span className="h-full flex-1 bg-brand-glow" />
          <span className="h-full flex-1 bg-brand-glow" />
          <span className="h-full flex-1 bg-brand-glow/30" />
        </span>
      </div>
      {/* Sits just below the frame so it never collides with the artwork's own lettering. */}
      <div className="absolute left-1/2 top-full mt-3 flex -translate-x-1/2 gap-4 whitespace-nowrap text-white/60">
        <span>ISO 400</span>
        <span className="text-brand-glow">f/1.8</span>
        <span>1/250</span>
      </div>

      {/* Autofocus box that follows the cursor */}
      <motion.div className="absolute inset-0" style={{ x: layerX, y: layerY, willChange: 'transform' }}>
        <div className="absolute left-0 top-0 h-14 w-14 -translate-x-1/2 -translate-y-1/2">
          <div className="loop-breathe h-full w-full border border-brand-glow shadow-[0_0_12px_rgba(47,155,255,0.6)]" />
          <span className="absolute -top-4 left-0 hidden text-[9px] text-brand-glow sm:block">AF-C ●</span>
        </div>
      </motion.div>
    </div>
  );
}
