import { useState } from 'react';
import { Navbar } from '@/components/sections/navbar';
import { HeroSection } from '@/components/sections/hero';
import { CategoriesSection } from '@/components/sections/categories';
import { PortfolioGallerySection } from '@/components/sections/portfolio-gallery';
import LatestVideos from '@/components/sections/video-reels';
import { AboutSection } from '@/components/sections/about';
import { ServicesSection } from '@/components/sections/services';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { WhatsAppChatButton } from '@/components/ui/whatsapp-chat-button';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <CategoriesSection
        selectedCategory={selectedCategory}
        onSelectCategory={(categoryId) => setSelectedCategory(categoryId)}
      />
      <PortfolioGallerySection
        selectedCategory={selectedCategory}
        onSelectCategory={(categoryId) => setSelectedCategory(categoryId)}
      />
      <LatestVideos />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppChatButton />
    </main>
  );
}
