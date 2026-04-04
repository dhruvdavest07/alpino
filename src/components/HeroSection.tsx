import { ArrowRight, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onMenuClick: () => void;
  onLocationsClick: () => void;
}

// Floating SVG shapes for golden-hour dust particle effect
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Peanut shapes */}
      <svg className="hero-floating-shape" width="24" height="40" viewBox="0 0 24 40" fill="none">
        <ellipse cx="12" cy="12" rx="8" ry="10" fill="rgba(193,127,58,0.06)" />
        <ellipse cx="12" cy="28" rx="8" ry="10" fill="rgba(193,127,58,0.06)" />
      </svg>
      <svg className="hero-floating-shape" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0z" fill="rgba(139,175,124,0.04)" />
      </svg>
      <svg className="hero-floating-shape" width="30" height="48" viewBox="0 0 24 40" fill="none">
        <ellipse cx="12" cy="12" rx="8" ry="10" fill="rgba(232,184,75,0.04)" />
        <ellipse cx="12" cy="28" rx="8" ry="10" fill="rgba(232,184,75,0.04)" />
      </svg>
      <svg className="hero-floating-shape" width="16" height="28" viewBox="0 0 16 28" fill="none">
        <path d="M8 0C3 0 0 3 0 7c0 5 4 8 8 14 4-6 8-9 8-14C16 3 13 0 8 0z" fill="rgba(193,127,58,0.05)" />
      </svg>
      <svg className="hero-floating-shape" width="22" height="36" viewBox="0 0 24 40" fill="none">
        <ellipse cx="12" cy="12" rx="8" ry="10" fill="rgba(139,175,124,0.03)" />
        <ellipse cx="12" cy="28" rx="8" ry="10" fill="rgba(139,175,124,0.03)" />
      </svg>
    </div>
  );
}

// Rotating circular badge
function RotatingBadge() {
  const text = "HIGH PROTEIN · FRESH DAILY · MADE FOR YOU · ";
  return (
    <div className="rotating-badge hidden lg:block">
      <svg viewBox="0 0 140 140" className="w-full h-full rotating-badge-text">
        <defs>
          <path id="circlePath" d="M70,70 m-55,0 a55,55 0 1,1 110,0 a55,55 0 1,1 -110,0" />
        </defs>
        <text fill="rgba(245,237,216,0.5)" fontSize="10" fontFamily="'IBM Plex Mono', monospace" letterSpacing="3" style={{ textTransform: 'uppercase' } as React.CSSProperties}>
          <textPath href="#circlePath">{text}</textPath>
        </text>
      </svg>
      {/* Center peanut icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 40" fill="none">
          <ellipse cx="12" cy="12" rx="7" ry="9" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
          <ellipse cx="12" cy="28" rx="7" ry="9" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </div>
  );
}

// Scroll indicator with dashed line and moving dot
function ScrollIndicator() {
  return (
    <div className="hero-scroll-indicator absolute bottom-8 right-8 hidden lg:flex items-end gap-3">
      <div className="scroll-indicator">
        <div className="scroll-line" style={{ borderLeft: '1px dashed rgba(232,184,75,0.3)' }}>
          <div className="scroll-line" />
        </div>
      </div>
      <span className="scroll-label">SCROLL TO EXPLORE</span>
    </div>
  );
}

export default function HeroSection({ onMenuClick, onLocationsClick }: HeroSectionProps) {
  return (
    <section id="hero" className="snap-section min-h-screen bg-mesh-hero flex items-center relative overflow-hidden">
      {/* Layered mesh gradient bg elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#C17F3A] rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#E8B84B] rounded-full blur-[120px]" />
        <div className="absolute bottom-40 left-1/4 w-60 h-60 bg-[#8BAF7C] rounded-full blur-[100px] opacity-50" />
      </div>

      <FloatingShapes />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden mb-3">
              <p className="hero-title-line font-mono text-sm tracking-[0.3em] mb-4" style={{ color: 'var(--gold)' }}>
                INDIA'S HIGH-PROTEIN CAFE
              </p>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-title-line font-display text-[clamp(72px,10vw,144px)] leading-[0.88] mb-1" style={{ color: 'var(--cream)' }}>
                Fuel
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-title-line font-display text-[clamp(72px,10vw,144px)] leading-[0.88] mb-1" style={{ color: 'var(--cream)' }}>
                Your
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-title-line font-display text-[clamp(72px,10vw,144px)] leading-[0.88] mb-8 text-gold-gradient">
                Day
              </h1>
            </div>
            <p className="hero-subtitle font-body text-lg md:text-xl max-w-[480px] mb-10 leading-relaxed" style={{ color: 'rgba(245,237,216,0.65)' }}>
              Macro-counted, chef-crafted meals with 30g+ protein. No junk. No compromise. Just real food that performs.
            </p>
            <div className="hero-cta-group flex flex-wrap gap-4">
              <button onClick={onMenuClick} className="cta-shimmer text-lg cursor-pointer flex items-center gap-2">
                Explore Menu <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={onLocationsClick} className="cta-outline text-lg cursor-pointer flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Find Us
              </button>
            </div>
          </div>

          {/* Right: Hero images */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="hero-image-main relative z-10">
              <div className="w-[400px] h-[400px] mx-auto rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/40">
                <img src="/pro_bowl.png" alt="Signature Protein Bowl" loading="eager" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="hero-image-float absolute -top-4 -right-4 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border border-white/10 animate-float">
              <img src="/smoothie_bowl.png" alt="Smoothie Bowl" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="hero-image-float absolute -bottom-6 -left-6 w-36 h-36 rounded-2xl overflow-hidden shadow-xl border border-white/10 animate-float-delayed">
              <img src="/protein_wrap.png" alt="Protein Wrap" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="hero-image-float absolute top-1/2 -right-10 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border border-white/10 animate-float" style={{ animationDelay: '1s' }}>
              <img src="/dessert_plate.png" alt="Protein Dessert" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Bottom-left: Rotating badge */}
        <div className="absolute bottom-12 left-12">
          <RotatingBadge />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
