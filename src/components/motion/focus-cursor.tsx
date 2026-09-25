import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Desktop-only cursor companion: a soft ring that snaps into focus brackets over anything
 * marked with data-cursor="<label>" (e.g. "View", "Drag"). The native cursor stays visible.
 */
export function FocusCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion) return;
    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = (event.target as Element | null)?.closest<HTMLElement>('[data-cursor]');
      setLabel(target?.dataset.cursor ?? null);
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
    };
  }, [enabled, reduceMotion, x, y]);

  if (!enabled || reduceMotion) return null;

  const focused = label !== null;
  const size = focused ? 84 : 28;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2"
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Four corner brackets; they read as a ring when small and a focus frame when large. */}
        {[
          'left-0 top-0 border-l border-t',
          'right-0 top-0 border-r border-t',
          'bottom-0 left-0 border-b border-l',
          'bottom-0 right-0 border-b border-r',
        ].map((corner) => (
          <motion.span
            key={corner}
            className={`absolute ${corner} ${focused ? 'border-brand-glow' : 'border-white/70'}`}
            animate={{ width: focused ? 18 : 10, height: focused ? 18 : 10 }}
          />
        ))}
        <span className={`absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${focused ? 'bg-brand-glow' : 'bg-white'}`} />
        <AnimatePresence>
          {focused && (
            <motion.span
              key={label}
              className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-black"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
