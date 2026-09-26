
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import { Reveal3D } from '@/components/motion/reveal-3d';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="reviews" className="py-14 sm:py-20 md:py-28 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal3D className="mb-8 text-center sm:mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-brand">Reviews</p>
          <h2 className="mt-4 font-serif text-3xl text-white sm:text-4xl md:text-5xl">Kind words from our couples</h2>
        </Reveal3D>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Testimonial Content */}
          <div className="text-center">
            {/* Quote Mark */}
            <div className="font-serif text-6xl leading-none text-brand/40 sm:mb-4 sm:text-7xl">&ldquo;</div>

            {/* Testimonial Text */}
            <p className="mb-8 text-lg font-light leading-relaxed text-white/90 sm:mb-12 sm:text-2xl md:text-3xl">
              {current.content}
            </p>

            {/* Stars */}
            <div className="flex gap-2 justify-center mb-8">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-brand text-brand"
                />
              ))}
            </div>
          </div>

          {/* Client Info */}
          {/* <div className="flex flex-col items-center gap-4 mt-12 pt-8 border-t border-white/10">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <img
                src={current.image}
                alt={current.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-white font-light text-lg">{current.name}</p>
              <p className="text-white/50 text-sm font-light">{current.role}</p>
            </div>
          </div> */}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center gap-6 sm:mt-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              aria-label="Previous review"
              className="text-white/50 hover:text-white border border-white/20 hover:border-white/50 rounded-full w-12 h-12 transition-smooth"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              aria-label="Next review"
              className="text-white/50 hover:text-white border border-white/20 hover:border-white/50 rounded-full w-12 h-12 transition-smooth"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="mt-4 flex justify-center sm:mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className="group flex h-11 w-11 items-center justify-center"
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex}
            >
              <span
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-brand' : 'w-2 bg-white/30 group-hover:bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
