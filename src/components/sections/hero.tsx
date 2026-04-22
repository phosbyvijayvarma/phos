
import { PORTFOLIO_CATEGORIES } from '@/lib/portfolio-data';
import { SITE_TAGLINE } from '@/lib/constants';
import { useEffect, useState } from 'react';

const HERO_SLIDES = PORTFOLIO_CATEGORIES.map((category) => ({
  image: category.image,
  title: category.name,
  subtitle: `Category: ${category.name}`,
}));

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section id="home" className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto grid h-full min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left Side */}
        <div className="flex items-center justify-center border-b border-white/10 px-6 py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-24">
          <div className="max-w-md text-center lg:text-left">
            <div className="mx-auto mb-8 flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:mx-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InShot_20250915_143819957.jpg%20%281%29-x1U8iTJpD9G3Q5zKgcndpwcKnrEMgW.jpeg"
                alt="PHOS BY VIJAYVARMA logo"
                className="h-50 w-auto rounded-full object-cover"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/45">
              PHOS BY VIJAYVARMA
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Wedding, Portrait & Event Photography
            </h1>
            <p className="mt-6 text-base text-white/70 sm:text-lg lg:text-xl">
              {SITE_TAGLINE}
            </p>
            <p className="mt-6 text-sm leading-7 text-white/60 sm:text-base">
              Cinematic storytelling for weddings, pre-wedding shoots, haldi, sangeeth, portraits,
              and milestone events captured with emotion and detail.
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.35em] text-white/40">
              Premium visual stories crafted for timeless memories.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div
          className="group relative flex items-center justify-center overflow-hidden px-6 py-12 lg:px-10 lg:py-24"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 opacity-90" />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
            {HERO_SLIDES.map((item, index) => (
              <div
                key={item.title}
                className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                  index === currentSlide ? 'translate-x-0 opacity-100' : index < currentSlide ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
                }`}
                aria-hidden={index !== currentSlide}
              >
                <img
                  src={item.image}
                  alt={`${item.title} photography by PHOS BY VIJAYVARMA`}
                  className="h-full w-full object-cover"
                  loading={index === currentSlide ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                <div className="absolute bottom-8 left-6 right-6 text-left text-white lg:left-10 lg:right-auto">
                  <p className="text-sm uppercase tracking-[0.35em] text-white/60">Featured story</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-sm text-white/70 sm:text-base">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:w-4 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
