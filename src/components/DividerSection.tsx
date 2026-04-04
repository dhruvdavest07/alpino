import { ArrowRight } from 'lucide-react';

interface DividerSectionProps {
  onMenuClick: () => void;
}

export default function DividerSection({ onMenuClick }: DividerSectionProps) {
  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <img src="/club_sandwich.png" alt="Fresh High-Protein Food" loading="lazy" className="parallax-img w-full h-[120%] object-cover absolute -top-[10%]" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,9,8,0.85), rgba(10,9,8,0.4), transparent)' }} />
      <div className="relative z-10 h-full flex items-center px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-lg">
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[0.95] mb-4" style={{ color: 'var(--cream)' }}>
            Food That Works As Hard As You
          </h2>
          <p className="font-body text-lg mb-8" style={{ color: 'rgba(245,237,216,0.6)' }}>
            Crafted by chefs, approved by nutritionists, devoured by everyone.
          </p>
          <button onClick={onMenuClick} className="cta-gold cursor-pointer flex items-center gap-2">
            See The Menu <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
