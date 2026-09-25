import { motion, type HTMLMotionProps } from 'framer-motion';

interface Reveal3DProps extends HTMLMotionProps<'div'> {
  delay?: number;
}

/** Flips content up into place (like a print being laid down) when it scrolls into view. */
export function Reveal3D({ delay = 0, style, children, ...props }: Reveal3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -22, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200, transformOrigin: '50% 100%', ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
