import { Flame, Shield, Leaf, Zap, Award } from 'lucide-react';

export default function BentoSection() {
  return (
    <section id="bento" className="snap-section py-24 md:py-32 bento-section" style={{ background: 'var(--void)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="font-mono text-sm tracking-[0.3em] mb-4" style={{ color: 'var(--gold)' }}>// THE ALPINO DIFFERENCE</p>
          <h2 className="font-athletic text-[clamp(48px,6vw,96px)] leading-[0.9]" style={{ color: 'var(--cream)' }}>
            Why We're Different
          </h2>
        </div>

        <div className="bento-grid">
          {/* Large card: Macro Counted */}
          <div className="bento-card bento-item bento-large relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, var(--ember), #B84820)' }}>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-700" />
            <Flame className="w-12 h-12 mb-6 text-white/80" />
            <h3 className="font-display text-3xl md:text-4xl mb-3 text-white">Macro Counted</h3>
            <p className="font-body text-lg text-white/70 leading-relaxed">
              Every item lists protein, carbs, fats, and calories. Track your goals without guesswork.
            </p>
          </div>

          {/* No Junk */}
          <div className="bento-card bento-item border" style={{ background: 'var(--earth)', borderColor: 'var(--mist)' }}>
            <Shield className="w-10 h-10 mb-4" style={{ color: 'var(--gold)' }} />
            <h3 className="font-display text-xl mb-2" style={{ color: 'var(--cream)' }}>No Junk</h3>
            <p className="font-body" style={{ color: 'rgba(245,237,216,0.5)' }}>Zero artificial preservatives, colors, or flavors. Just real food.</p>
          </div>

          {/* 100% Veg */}
          <div className="bento-card bento-item border" style={{ background: 'var(--earth)', borderColor: 'var(--mist)' }}>
            <Leaf className="w-10 h-10 mb-4" style={{ color: 'var(--sage)' }} />
            <h3 className="font-display text-xl mb-2" style={{ color: 'var(--cream)' }}>100% Veg</h3>
            <p className="font-body" style={{ color: 'rgba(245,237,216,0.5)' }}>Every single item on our menu is purely vegetarian.</p>
          </div>

          {/* High Protein */}
          <div className="bento-card bento-item col-span-1 md:col-span-2" style={{ background: 'linear-gradient(135deg, var(--gold), var(--peanut))' }}>
            <Zap className="w-10 h-10 mb-4" style={{ color: 'var(--void)' }} />
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--void)' }}>High Protein</h3>
            <p className="font-body" style={{ color: 'rgba(10,9,8,0.7)' }}>
              30g+ average protein per meal. Designed for athletes, gym-goers, and health-conscious humans.
            </p>
          </div>

          {/* Shark Tank */}
          <div className="bento-card bento-item col-span-1 md:col-span-2 border" style={{ background: 'var(--earth)', borderColor: 'var(--mist)' }}>
            <Award className="w-10 h-10 mb-4" style={{ color: 'var(--ember)' }} />
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--cream)' }}>Shark Tank Featured</h3>
            <p className="font-body" style={{ color: 'rgba(245,237,216,0.5)' }}>
              Endorsed by Shilpa Shetty. Featured on Shark Tank India Season 1. Building protein habits in 15+ countries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
