
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ id: number; src: string; title: string }>;
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrevious,
  onNext,
}: LightboxProps) {
  if (!images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="max-w-5xl max-h-screen bg-black border-gold/20 p-0 overflow-hidden rounded-none">
        <div className="relative w-full h-screen md:h-96 lg:h-full flex flex-col bg-black">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:text-gold hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Main Image */}
          <div className="flex-1 relative flex items-center justify-center">
            <img
              src={currentImage.src}
              alt={currentImage.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              className="text-white hover:text-gold hover:bg-white/10"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="text-white hover:text-gold hover:bg-white/10"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>

          {/* Image Info and Counter */}
          <div className="bg-black/80 border-t border-gold/20 px-6 py-4 flex items-center justify-between">
            <h3 className="text-white font-serif text-lg">{currentImage.title}</h3>
            <p className="text-white/60 text-sm font-light">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
