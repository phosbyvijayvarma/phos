import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PhosMark } from '@/components/brand/phos-logo';

const BLADES = 8;
const SEEN_KEY = 'phos-intro-seen';

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

/** Opening title: a camera aperture iris spins open to reveal the site. Plays once per visit. */
export function ShutterIntro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !hasSeenIntro());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Private mode: the intro just plays again next time.
    }
    const openTimer = window.setTimeout(() => setOpen(true), reduceMotion ? 200 : 1100);
    const doneTimer = window.setTimeout(() => setVisible(false), reduceMotion ? 500 : 2300);
    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
    };
  }, [visible, reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
        >
          {Array.from({ length: BLADES }).map((_, index) => (
            // Outer layer fixes the blade's angle; inner blade slides outward along it and twists.
            <div key={index} className="absolute inset-0" style={{ transform: `rotate(${index * (360 / BLADES)}deg)` }}>
              <motion.div
                className="absolute left-1/2 top-1/2 -ml-[100vmax] -mt-[200vmax] h-[200vmax] w-[200vmax] border-b border-brand/40 bg-gradient-to-t from-[#0b1220] to-black"
                style={{ transformOrigin: '50% 100%' }}
                initial={{ y: 0, rotate: 0 }}
                animate={open ? { y: '-75vmax', rotate: -30 } : { y: 0, rotate: 0 }}
                transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
              />
            </div>
          ))}

          {/* Flash as the shutter fires */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={open ? { opacity: [0, 0.35, 0] } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            animate={open ? { opacity: 0, scale: 1.6 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <PhosMark className="h-24 w-24 drop-shadow-[0_0_30px_rgba(47,155,255,0.6)]" />
            </motion.div>
            <motion.p
              className="text-[11px] uppercase tracking-[0.6em] text-brand-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4, 1] }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Focusing…
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
