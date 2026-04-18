import { Button } from '@/components/ui/button';
import { SERVICES } from '@/lib/constants';

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">
            Comprehensive photography packages tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-charcoal border border-gold/20 p-8 hover:border-gold/50 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-6">{service.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{service.title}</h3>

              {/* Description */}
              <p className="text-white/70 font-light leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Price */}
              <p className="text-gold font-semibold text-lg mb-6">
                {service.price === 'Contact for price' ? (
                  <a href="#contact" className="underline decoration-gold/50 hover:text-white">
                    {service.price}
                  </a>
                ) : (
                  service.price
                )}
              </p>

              {/* CTA Button */}
              <Button
                asChild
                className="w-full bg-gold hover:bg-gold/90 text-black font-semibold rounded-none transition-smooth"
              >
                <a href="#contact">Get Quote</a>
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 font-light text-lg mb-6">
            Custom packages and special requests available
          </p>
          <Button
            asChild
            className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-3 rounded-none transition-smooth"
          >
            <a href="#contact">Contact Us for Custom Pricing</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
