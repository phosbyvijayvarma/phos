import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ id: number; src: string; title: string }>;
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

const SWIPE_DISTANCE = 80;

export function Lightbox({ isOpen, onClose, images, currentIndex, onPrevious, onNext }: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') onPrevious();
      if (event.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onPrevious, onNext]);

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  const navButton =
    'absolute top-1/2 z-40 hidden -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-3 text-white backdrop-blur transition hover:border-brand hover:text-brand-glow sm:block';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="h-[100dvh] w-screen max-w-none rounded-none border-0 bg-black/95 p-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">{currentImage.title} photo viewer</DialogTitle>
        {/* Camera flash as the viewer opens */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-50 bg-white"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />

        <div className="relative flex h-full w-full flex-col">
          <div className="flex items-center justify-between px-5 py-4 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              {currentImage.title} <span className="ml-2 text-white/40">{currentIndex + 1} / {images.length}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-full border border-white/15 p-2 transition hover:border-white/50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={currentImage.id}
                src={currentImage.src}
                alt={`${currentImage.title} photography by PHOS BY VIJAYVARMA`}
                className="absolute inset-0 m-auto h-full w-full touch-pan-y select-none object-contain px-2 pb-6 sm:px-20"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x > SWIPE_DISTANCE) onPrevious();
                  else if (info.offset.x < -SWIPE_DISTANCE) onNext();
                }}
                draggable={false}
              />
            </AnimatePresence>

            <button type="button" onClick={onPrevious} aria-label="Previous photo" className={`${navButton} left-4`}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" onClick={onNext} aria-label="Next photo" className={`${navButton} right-4`}>
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <p className="pb-5 text-center text-[11px] uppercase tracking-[0.3em] text-white/35 sm:hidden">Swipe to browse</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
