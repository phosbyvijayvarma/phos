import { MotionConfig } from 'framer-motion';
import { Navbar } from '@/components/sections/navbar';
import { HeroSection } from '@/components/sections/hero';
import { PortfolioGallerySection } from '@/components/sections/portfolio-gallery';
import LatestVideos from '@/components/sections/video-reels';
import { AboutSection } from '@/components/sections/about';
import { ServicesSection } from '@/components/sections/services';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { WhatsAppChatButton } from '@/components/ui/whatsapp-chat-button';
import { SEO } from '@/components/seo';
import { FilmStripSection } from '@/components/sections/film-strip';
import { ShutterIntro } from '@/components/motion/shutter-intro';
import { FocusCursor } from '@/components/motion/focus-cursor';

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="overflow-x-clip">
        <SEO />
        <Navbar />
        <HeroSection />
        <FilmStripSection />
        <PortfolioGallerySection />
        <LatestVideos />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <WhatsAppChatButton />
        <FocusCursor />
        <ShutterIntro />
      </main>
    </MotionConfig>
  );
}
