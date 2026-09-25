import type { PointerEvent, ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the card edges. */
  maxTilt?: number;
}

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/** Tilts toward the cursor in 3D with a soft light glare, like turning a print in your hand. */
export function TiltCard({ children, className, maxTilt = 10 }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), SPRING);
  const scale = useSpring(useTransform(hover, [0, 1], [1, 1.02]), SPRING);
  const glareOpacity = useSpring(hover, SPRING);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.28), transparent 55%)`;

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
    hover.set(1);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, scale, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={cn('relative will-change-transform', className)}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] mix-blend-soft-light"
        style={{ background: glare, opacity: glareOpacity }}
      />
    </motion.div>
  );
}
