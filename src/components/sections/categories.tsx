import { PORTFOLIO_CATEGORIES } from '@/lib/portfolio-data';

interface CategoriesSectionProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoriesSection({ selectedCategory, onSelectCategory }: CategoriesSectionProps) {
  const handleCategoryClick = (categoryId: string | null) => {
    onSelectCategory(categoryId);
    const portfolioSection = document.getElementById('portfolio');

    portfolioSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-light text-white mb-6 tracking-wider">
            Categories
          </h2>
          <p className="text-sm text-white/50 font-light uppercase tracking-widest">
            Cinematic photography across all genres
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryClick(category.id)}
              className="group relative overflow-hidden h-96 cursor-pointer rounded-[2rem] border border-white/10 bg-white/5 text-left shadow-xl shadow-black/20 transition hover:border-white/20 hover:shadow-black/30"
            >
              <div className="relative w-full h-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-300" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl font-serif font-light mb-2 tracking-wider">{category.name}</h3>
                <div className="inline-flex items-center gap-2 text-white font-light text-sm tracking-widest uppercase opacity-90">
                  <span>Explore</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
