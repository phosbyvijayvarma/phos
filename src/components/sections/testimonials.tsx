
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

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
    <section className="py-20 md:py-32 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-light text-white mb-6 tracking-wider">
            Testimonials
          </h2>
          <p className="text-sm text-white/50 font-light uppercase tracking-widest">
            What our clients say
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Testimonial Content */}
          <div className="text-center">
            {/* Quote Mark */}
            <div className="text-7xl text-white/20 mb-8 font-serif">"</div>

            {/* Testimonial Text */}
            <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed mb-12">
              {current.content}
            </p>

            {/* Stars */}
            <div className="flex gap-2 justify-center mb-8">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-white text-white"
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
          <div className="flex justify-center gap-6 mt-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="text-white/50 hover:text-white border border-white/20 hover:border-white/50 rounded-full w-12 h-12 transition-smooth"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="text-white/50 hover:text-white border border-white/20 hover:border-white/50 rounded-full w-12 h-12 transition-smooth"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
