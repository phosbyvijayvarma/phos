import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { Lightbox } from '@/components/ui/lightbox';
import { PhotoRing3D } from '@/components/motion/photo-ring-3d';
import { Reveal3D } from '@/components/motion/reveal-3d';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';
import { getImageInfo } from '@/lib/images';

const PAGE_SIZE = 12;

const CATEGORY_NAMES: Record<string, string> = Object.fromEntries(
  PORTFOLIO_CATEGORIES.map((category) => [category.id, category.name]),
);

// Interleave categories so "All" opens with variety instead of eleven haldi shots in a row.
const MIXED_IMAGES = (() => {
  const buckets = PORTFOLIO_CATEGORIES.map((category) => PORTFOLIO_IMAGES.filter((img) => img.category === category.id));
  const mixed: typeof PORTFOLIO_IMAGES = [];
  for (let i = 0; mixed.length < PORTFOLIO_IMAGES.length; i++) {
    buckets.forEach((bucket) => bucket[i] && mixed.push(bucket[i]));
  }
  return mixed;
})();

export function PortfolioGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const images = useMemo(
    () => (selectedCategory ? PORTFOLIO_IMAGES.filter((img) => img.category === selectedCategory) : MIXED_IMAGES),
    [selectedCategory],
  );
  const shown = images.slice(0, visibleCount);

  const selectCategory = (categoryId: string | null, scroll = false) => {
    setSelectedCategory(categoryId);
    setVisibleCount(PAGE_SIZE);
    if (scroll) filtersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filters = [
    { id: null, name: 'All', count: PORTFOLIO_IMAGES.length },
    ...PORTFOLIO_CATEGORIES.map((category) => ({
      id: category.id,
      name: category.name,
      count: PORTFOLIO_IMAGES.filter((img) => img.category === category.id).length,
    })),
  ];

  return (
    <section id="portfolio" className="relative bg-black py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal3D>
            <p className="text-xs uppercase tracking-[0.4em] text-brand">Portfolio</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-6xl">Every story, its own light.</h2>
            <p className="mt-5 max-w-md text-white/60">
              Spin the ring or tap a story to see that collection. Tap any photo to view it full screen.
            </p>
          </Reveal3D>
          <PhotoRing3D photos={PORTFOLIO_CATEGORIES} onSelect={(id) => selectCategory(id, true)} />
        </div>

        {/* Filters + grid share a wrapper so the sticky bar lets go before the "Show more" button. */}
        <div>
          <div
            ref={filtersRef}
            className="sticky top-16 z-30 -mx-4 mt-8 sm:mt-12 scroll-mt-16 border-y border-white/10 bg-black/95 px-4 py-3 sm:mx-0 sm:bg-black/80 sm:backdrop-blur-md sm:rounded-full sm:border sm:px-3"
          >
            <div role="tablist" aria-label="Filter photos by story" className="-mr-4 flex gap-2 overflow-x-auto pr-8 [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] sm:mr-0 sm:pr-0 sm:[mask-image:none] [&::-webkit-scrollbar]:hidden">
              {filters.map((filter) => {
                const isActive = selectedCategory === filter.id;
                return (
                  <button
                    key={filter.name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectCategory(filter.id)}
                    className={cn(
                      'relative min-h-11 shrink-0 rounded-full px-4 py-2 text-sm transition-colors',
                      isActive ? 'text-black' : 'text-white/65 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {isActive && (
                      <motion.span layoutId="portfolio-filter" className="absolute inset-0 rounded-full bg-brand" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                    )}
                    <span className="relative">
                      {filter.name} <span className={isActive ? 'text-black/60' : 'text-white/35'}>{filter.count}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Masonry grid */}
          <div className="mt-5 columns-2 gap-3 sm:mt-8 sm:gap-4 md:columns-3 lg:columns-4">
            {shown.map((image, index) => {
              const info = getImageInfo(image.src);
              return (
                <motion.button
                  key={`${selectedCategory ?? 'all'}-${image.id}`}
                  type="button"
                  initial={{ opacity: 0, y: 24, rotateX: -12 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 1000 }}
                  onClick={() => setLightboxIndex(index)}
                  data-cursor="View"
                  aria-label={`Open ${CATEGORY_NAMES[image.category]} photo ${index + 1} full screen`}
                  className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:mb-4"
                >
                  <img
                    src={info.thumb}
                    width={info.width}
                    height={info.height}
                    alt={`${CATEGORY_NAMES[image.category]} photography by PHOS BY VIJAYVARMA`}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full bg-white/5 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="text-xs uppercase tracking-[0.2em] text-white">{CATEGORY_NAMES[image.category]}</span>
                    <Maximize2 className="h-4 w-4 text-white" />
                  </div>
                </motion.button>
              );
            })}
          </div>

        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-white/40">
            Showing {shown.length} of {images.length} photos
          </p>
          {visibleCount < images.length && (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition hover:border-brand hover:text-brand-glow"
            >
              Show more photos
            </button>
          )}
        </div>
      </div>

      <Lightbox
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        images={images.map((img) => ({ ...img, title: CATEGORY_NAMES[img.category] }))}
        currentIndex={lightboxIndex ?? 0}
        onPrevious={() => setLightboxIndex((prev) => ((prev ?? 0) === 0 ? images.length - 1 : (prev ?? 0) - 1))}
        onNext={() => setLightboxIndex((prev) => ((prev ?? 0) === images.length - 1 ? 0 : (prev ?? 0) + 1))}
      />
    </section>
  );
}
