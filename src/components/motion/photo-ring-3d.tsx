import { useEffect, useRef, useState, type PointerEvent } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

export interface RingPhoto {
  id: string;
  name: string;
  image: string;
}

interface PhotoRing3DProps {
  photos: RingPhoto[];
  onSelect?: (id: string) => void;
}

const AUTO_SPEED = 0.008; // degrees per millisecond (~one turn every 45s)
const HOVER_SPEED = 0.002;
const DRAG_FACTOR = 0.35;

function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

/** A carousel of photo prints arranged on a slowly turning 3D ring. */
export function PhotoRing3D({ photos, onSelect }: PhotoRing3DProps) {
  const reduceMotion = useReducedMotion();
  const [containerRef, containerWidth] = useElementWidth<HTMLDivElement>();

  const count = photos.length;
  const step = 360 / count;
  const cardWidth = Math.min(Math.max(containerWidth * 0.26, 104), 190);
  const cardHeight = cardWidth * 1.42;
  const radius = (cardWidth / 2 / Math.tan(Math.PI / count)) * 1.18;

  const rotation = useMotionValue(0);
  const isHovering = useRef(false);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const lastX = useRef(0);

  // Mouse parallax: the whole ring leans toward the cursor.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(useTransform(pointerY, [-1, 1], [-4, -16]), { stiffness: 80, damping: 20 });
  const tiltZ = useSpring(useTransform(pointerX, [-1, 1], [3, -3]), { stiffness: 80, damping: 20 });

  const [activeIndex, setActiveIndex] = useState(0);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || isDragging.current) return;
    const speed = isHovering.current ? HOVER_SPEED : AUTO_SPEED;
    rotation.set(rotation.get() - delta * speed);
  });

  useMotionValueEvent(rotation, 'change', (value) => {
    const index = (((Math.round(-value / step) % count) + count) % count);
    setActiveIndex((prev) => (prev === index ? prev : index));
  });

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    didDrag.current = false;
    lastX.current = event.clientX;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);

    if (!isDragging.current) return;
    const dx = event.clientX - lastX.current;
    lastX.current = event.clientX;
    if (Math.abs(dx) > 0) {
      if (!didDrag.current && Math.abs(dx) > 2) {
        didDrag.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      rotation.set(rotation.get() + dx * DRAG_FACTOR);
    }
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  const handleLeave = () => {
    isHovering.current = false;
    isDragging.current = false;
    pointerX.set(0);
    pointerY.set(0);
  };

  const active = photos[activeIndex];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div
        ref={containerRef}
        data-cursor="Drag"
        className="relative flex w-full cursor-grab touch-pan-y select-none items-center justify-center active:cursor-grabbing"
        style={{ height: cardHeight * 1.9, perspective: 1100 }}
        onPointerEnter={() => (isHovering.current = true)}
        onPointerLeave={handleLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* Floor glow / reflection */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(47,155,255,0.28),transparent_70%)] blur-2xl"
          style={{ bottom: '4%', width: radius * 2.4, height: cardHeight * 0.5 }}
        />

        {containerWidth > 0 && (
          <motion.div
            className="relative"
            style={{
              width: cardWidth,
              height: cardHeight,
              transformStyle: 'preserve-3d',
              rotateX: tiltX,
              rotateZ: tiltZ,
            }}
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d', rotateY: rotation }}
            >
              {photos.map((photo, index) => (
                <RingCard
                  key={photo.id}
                  photo={photo}
                  index={index}
                  step={step}
                  radius={radius}
                  rotation={rotation}
                  onClick={() => {
                    if (!didDrag.current) onSelect?.(photo.id);
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Caption for the print facing the viewer */}
      <div className="relative mt-2 h-20 w-full text-center" style={{ perspective: 600 }}>
        <p className="text-[10px] uppercase tracking-[0.5em] text-brand/80">Featured story</p>
        <AnimatePresence mode="wait">
          <motion.h2
            key={active?.id}
            initial={{ opacity: 0, rotateX: -90, y: 12 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 90, y: -12 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mt-2 font-serif text-3xl font-light tracking-wider text-white sm:text-4xl"
          >
            {active?.name}
          </motion.h2>
        </AnimatePresence>
        <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/30">Drag to spin · Tap to filter</p>
      </div>
    </div>
  );
}

interface RingCardProps {
  photo: RingPhoto;
  index: number;
  step: number;
  radius: number;
  rotation: MotionValue<number>;
  onClick: () => void;
}

function RingCard({ photo, index, step, radius, rotation, onClick }: RingCardProps) {
  // 1 when this print faces the viewer, -1 when it's at the back of the ring.
  const facing = useTransform(rotation, (r) => Math.cos(((index * step + r) * Math.PI) / 180));
  const shade = useTransform(facing, [-1, 0, 1], [0.8, 0.55, 0]);

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="View"
      aria-label={`Show ${photo.name} photos`}
      className="group absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-2xl shadow-black/60 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      style={{ transform: `rotateY(${index * step}deg) translateZ(${radius}px)` }}
    >
      <img
        src={photo.image}
        alt={`${photo.name} photography by PHOS BY VIJAYVARMA`}
        draggable={false}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 right-3 text-left text-[10px] uppercase tracking-[0.3em] text-white/80">
        {photo.name}
      </span>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
    </button>
  );
}
