import { useId } from 'react';
import { cn } from '@/lib/utils';

// Letter strokes for P, H and S on a 0-300 x 0-100 grid; the lens sits in the "O" slot.
const LETTERS = [
  'M14 82 V18 H50 a16 16 0 0 1 0 32 H14',
  'M84 18 V82 M124 18 V82 M84 50 H124',
  'M286 26 Q280 18 264 18 H254 a16 16 0 0 0 0 32 h14 a16 16 0 0 1 0 32 h-12 Q240 82 234 74',
];

interface LensProps {
  cx: number;
  cy: number;
  r: number;
  ids: { ring: string; glass: string };
}

function Lens({ cx, cy, r, ids }: LensProps) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`url(#${ids.ring})`} strokeWidth={r * 0.2} />
      <circle cx={cx} cy={cy} r={r * 0.78} fill="#05070c" stroke="#9aa4b2" strokeOpacity={0.55} strokeWidth={r * 0.05} />
      <circle cx={cx} cy={cy} r={r * 0.52} fill={`url(#${ids.glass})`} />
      <circle cx={cx} cy={cy} r={r * 0.2} fill="#020308" />
      <ellipse cx={cx - r * 0.22} cy={cy - r * 0.26} rx={r * 0.14} ry={r * 0.08} fill="#fff" opacity={0.85} transform={`rotate(-35 ${cx - r * 0.22} ${cy - r * 0.26})`} />
      <circle cx={cx + r * 0.24} cy={cy + r * 0.2} r={r * 0.05} fill="#c4b5fd" opacity={0.8} />
    </g>
  );
}

function Defs({ ids }: { ids: { ring: string; glass: string; stroke: string; glow: string } }) {
  return (
    <defs>
      <linearGradient id={ids.stroke} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8fdcff" />
        <stop offset="0.5" stopColor="#2f9bff" />
        <stop offset="1" stopColor="#1463ff" />
      </linearGradient>
      <linearGradient id={ids.ring} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#bfe9ff" />
        <stop offset="0.5" stopColor="#2f9bff" />
        <stop offset="1" stopColor="#0b4fd6" />
      </linearGradient>
      <radialGradient id={ids.glass} cx="0.4" cy="0.35" r="0.75">
        <stop offset="0" stopColor="#7cc4ff" />
        <stop offset="0.45" stopColor="#1d4ed8" />
        <stop offset="0.8" stopColor="#4c1d95" />
        <stop offset="1" stopColor="#0b1020" />
      </radialGradient>
      <filter id={ids.glow} x="-20%" y="-40%" width="140%" height="180%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function useLogoIds() {
  const id = useId().replace(/:/g, '');
  return { ring: `ring${id}`, glass: `glass${id}`, stroke: `stroke${id}`, glow: `glow${id}` };
}

interface PhosLogoProps {
  className?: string;
  /** Show the "BY VIJAY VARMA" line under the wordmark. */
  withByline?: boolean;
  glow?: boolean;
}

/** The PHOS wordmark: neon double-line letters with a camera lens for the "O". Sized by font-size. */
export function PhosLogo({ className, withByline = false, glow = true }: PhosLogoProps) {
  const ids = useLogoIds();

  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <svg viewBox="0 0 300 100" className="h-[1em] w-auto overflow-visible" role="img" aria-label="PHOS by Vijay Varma">
        <Defs ids={ids} />
        <g filter={glow ? `url(#${ids.glow})` : undefined}>
          <g fill="none" stroke={`url(#${ids.stroke})`} strokeWidth={11} strokeLinejoin="miter" strokeLinecap="butt">
            {LETTERS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          {/* Inline cut gives the letters their double-line neon look. */}
          <g fill="none" stroke="#000" strokeOpacity={0.75} strokeWidth={2.2}>
            {LETTERS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <Lens cx={179} cy={50} r={34} ids={ids} />
        </g>
      </svg>
      {withByline && (
        <span className="mt-[0.35em] flex w-full items-center gap-2 text-[0.28em] font-medium uppercase tracking-[0.35em] text-white/80">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brand/70" />
          By Vijay Varma
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brand/70" />
        </span>
      )}
    </span>
  );
}

/** Just the lens, for tight spaces like avatars and loading states. */
export function PhosMark({ className }: { className?: string }) {
  const ids = useLogoIds();

  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="PHOS">
      <Defs ids={ids} />
      <Lens cx={50} cy={50} r={40} ids={ids} />
    </svg>
  );
}
