
import { useState, useMemo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbox } from '@/components/ui/lightbox';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from '@/lib/portfolio-data';

interface PortfolioGallerySectionProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function PortfolioGallerySection({ selectedCategory, onSelectCategory }: PortfolioGallerySectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState(PORTFOLIO_IMAGES);

  const categoriesWithImages = useMemo(
    () =>
      PORTFOLIO_CATEGORIES.map((category) => ({
        ...category,
        images: PORTFOLIO_IMAGES.filter((img) => img.category === category.id),
      })),
    [],
  );

  const visibleCategories = selectedCategory
    ? categoriesWithImages.filter((category) => category.id === selectedCategory)
    : categoriesWithImages;

  const handleImageClick = (images: typeof PORTFOLIO_IMAGES, index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleAccordionChange = (value: string | null) => {
    onSelectCategory(value);
  };

  const currentAccordionValue = selectedCategory ?? undefined;

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-light text-white mb-6 tracking-wider">
            Portfolio
          </h2>
          <p className="text-sm text-white/50 font-light uppercase tracking-widest">
            Browse each category in collapsible sections
          </p>
        </div>

        <Accordion type="single" collapsible value={currentAccordionValue} onValueChange={handleAccordionChange}>
          <div className="grid gap-4">
            {visibleCategories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-7 text-left text-white transition hover:border-white/20 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20">
                  <div>
                    <h3 className="text-3xl font-serif font-light tracking-wider">{category.name}</h3>
                    <p className="mt-1 text-sm text-white/60">{category.images.length} photos in this category</p>
                  </div>
                  <span className="text-sm text-white/70">Open</span>
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden rounded-b-3xl border border-white/10 border-t-0 bg-slate-950/70 mt-[-1px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {category.images.map((image, index) => (
                      <div
                        key={image.id}
                        className="group relative aspect-square overflow-hidden cursor-pointer rounded-3xl border border-white/10 bg-white/5"
                        onClick={() => handleImageClick(category.images, index)}
                      >
                        <img
                          src={image.thumb}
                          alt={image.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center rounded-3xl">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 border-2 border-white/80 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onPrevious={() => setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1))}
        onNext={() => setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1))}
      />
    </section>
  );
}
