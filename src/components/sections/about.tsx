
export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative h-96 md:h-full overflow-hidden order-2 md:order-1">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20250823_140519.jpg%20%281%29-8Y7Wnjm3hyjyAxj0VZlQdSNx2g3oYr.jpeg"
              alt="Vijay Varma - Photographer"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 flex flex-col justify-center">
            <div className="mb-4">
              <p className="text-sm text-white/50 font-light uppercase tracking-widest text-left">Meet the Founder</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-light text-white mb-2 tracking-wider text-left">
              Vijay Varma
            </h2>
            <p className="text-sm text-white/50 font-light uppercase tracking-widest mb-8 text-left">Photographer & Filmmaker</p>

            <p className="text-lg text-white/80 font-light leading-relaxed mb-6 text-left">
              We are here to serve you on your big day with great passion and discipline. PHOS by Vijayvarma specializes in capturing universal emotions in a unique way, preserving the authentic beauty of your most significant moments.
            </p>

            <p className="text-lg text-white/80 font-light leading-relaxed mb-10 text-left">
              Our cinematic approach to photography and videography ensures every frame tells your unique love story. With dedication to excellence and artistic vision, we create timeless memories that will be treasured for generations to come.
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/20">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-sm font-light uppercase tracking-widest mb-1">Passion & Discipline</h3>
                  <p className="text-white/60 font-light text-sm">
                    Serving your big day with great passion and disciplined execution
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/20">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-sm font-light uppercase tracking-widest mb-1">Universal Emotions</h3>
                  <p className="text-white/60 font-light text-sm">
                    Capturing emotions in unique, authentic ways that resonate across time
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/20">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-sm font-light uppercase tracking-widest mb-1">Cinematic Quality</h3>
                  <p className="text-white/60 font-light text-sm">
                    Photography & videography with cinematic vision and technical excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
