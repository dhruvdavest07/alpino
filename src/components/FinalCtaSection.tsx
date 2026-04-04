import { ArrowRight } from 'lucide-react';

interface FinalCtaSectionProps {
  onMenuClick: () => void;
}

export default function FinalCtaSection({ onMenuClick }: FinalCtaSectionProps) {
  return (
    <section className="snap-section relative overflow-hidden py-32 md:py-40 flex items-center justify-center" style={{ background: 'var(--earth)' }}>
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[120px]" style={{ background: 'var(--gold)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[150px]" style={{ background: 'var(--peanut)' }} />
      </div>
      <div className="relative z-10 text-center px-6">
        <h2 className="font-display text-[clamp(48px,10vw,120px)] leading-[0.9] mb-8 text-gold-gradient">
          Fuel Your Day
        </h2>
        <p className="font-body text-xl mb-10 max-w-lg mx-auto" style={{ color: 'rgba(245,237,216,0.6)' }}>
          Pickup or dine-in. Fresh, fast, and built for your goals.
        </p>
        <button onClick={onMenuClick} className="cta-shimmer text-xl cursor-pointer !py-5 !px-10 flex items-center gap-3 mx-auto shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(232,184,75,0.3)' }}>
          Start Your Order <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
