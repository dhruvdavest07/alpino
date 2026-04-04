import { MapPin, ArrowRight } from 'lucide-react';

interface LocationSectionProps {
  onLocationsClick: () => void;
}

export default function LocationSection({ onLocationsClick }: LocationSectionProps) {
  return (
    <section id="locations" className="snap-section py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--earth)' }}>
      {/* Decorative rotating circle */}
      <div className="deco-circle -right-48 top-1/2 -translate-y-1/2" />

      {/* Dark overlay bg image */}
      <div className="absolute inset-0 opacity-10">
        <img src="/locations_map.png" alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="reveal-item">
            <p className="font-mono text-sm tracking-[0.3em] mb-4" style={{ color: 'var(--gold)' }}>// FIND US</p>
            <h2 className="font-athletic text-[clamp(48px,6vw,72px)] leading-[0.9] mb-6" style={{ color: 'var(--cream)' }}>
              Find Your Fuel
            </h2>

            {/* Flagship address */}
            <div className="pull-quote mb-8">
              <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--cream)' }}>Surat — Flagship</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(245,237,216,0.6)' }}>
                Pragati Marg, inside Kratos Club, nr. BAGHBAN CIRCLE, Adajan Gam, Pal Gam, Surat, Gujarat 394510
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2.5 h-2.5 rounded-full glow-dot" style={{ background: 'var(--sage)' }} />
                <span className="font-mono text-[10px]" style={{ color: 'var(--sage)' }}>OPEN NOW</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button onClick={onLocationsClick} className="cta-gold cursor-pointer flex items-center gap-2">
                <MapPin className="w-4 h-4" /> All Locations
              </button>
              <button onClick={onLocationsClick} className="cta-outline cursor-pointer flex items-center gap-2">
                Get Directions <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery badges */}
            <div className="flex items-center gap-6 mt-10">
              <div className="delivery-badge">
                <p className="font-body font-bold text-sm" style={{ color: 'var(--cream)' }}>Swiggy</p>
              </div>
              <div className="delivery-badge">
                <p className="font-body font-bold text-sm" style={{ color: 'var(--cream)' }}>Zomato</p>
              </div>
            </div>
          </div>

          {/* Right: Location cards */}
          <div className="reveal-item space-y-4">
            {['Ahmedabad', 'Mumbai', 'Bangalore', 'Pune'].map((city, i) => (
              <div
                key={city}
                onClick={onLocationsClick}
                className="glass-card p-5 flex items-center justify-between cursor-pointer hover:border-[rgba(232,184,75,0.3)] transition-all duration-300 hover:translate-x-2"
              >
                <div>
                  <h3 className="font-display text-lg" style={{ color: 'var(--cream)' }}>{city}</h3>
                  <p className="font-mono text-[10px]" style={{ color: 'rgba(245,237,216,0.4)' }}>
                    Q{i < 1 ? 2 : 3} 2026
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-3 py-1 rounded-full" style={{ background: 'var(--mist)', color: 'rgba(245,237,216,0.5)' }}>
                    COMING SOON
                  </span>
                  <ArrowRight className="w-4 h-4" style={{ color: 'var(--peanut)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
