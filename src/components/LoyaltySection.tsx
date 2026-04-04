import { Gift } from 'lucide-react';

interface LoyaltySectionProps {
  onLoyaltyClick: () => void;
}

export default function LoyaltySection({ onLoyaltyClick }: LoyaltySectionProps) {
  return (
    <section id="loyalty" className="snap-section py-24 md:py-32" style={{ background: 'var(--cream)', color: 'var(--void)' }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="reveal-item">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float" style={{ background: 'linear-gradient(135deg, var(--gold), var(--peanut))', boxShadow: '0 20px 40px rgba(232,184,75,0.3)' }}>
            <Gift className="w-10 h-10" style={{ color: 'var(--void)' }} />
          </div>
          <p className="font-mono text-sm tracking-[0.3em] mb-4" style={{ color: 'var(--peanut)' }}>// ALPINO CLUB</p>
          <h2 className="font-athletic text-[clamp(48px,6vw,72px)] leading-[0.9] mb-6" style={{ color: 'var(--void)' }}>
            Eat Smart. Get Rewarded.
          </h2>
          <p className="font-body text-lg mb-12 max-w-lg mx-auto" style={{ color: 'rgba(10,9,8,0.5)' }}>
            Earn on every order. Unlock perks, early drops, and members-only fuel.
          </p>
        </div>

        <div className="reveal-item flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          {[
            { n: '1', t: 'Order', d: 'via app or in-store' },
            { n: '2', t: 'Earn', d: '1 point per ₹10' },
            { n: '3', t: 'Redeem', d: 'discounts & perks' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-display text-xl shadow-lg" style={{ background: 'var(--peanut)', color: 'white', boxShadow: '0 10px 30px rgba(193,127,58,0.3)' }}>
                  {step.n}
                </div>
                <h4 className="font-body font-bold mt-3" style={{ color: 'var(--void)' }}>{step.t}</h4>
                <p className="font-body text-sm" style={{ color: 'rgba(10,9,8,0.4)' }}>{step.d}</p>
              </div>
              {i < 2 && <div className="hidden md:block w-16 h-px" style={{ background: 'linear-gradient(90deg, var(--peanut), var(--gold))' }} />}
            </div>
          ))}
        </div>

        <div className="reveal-item">
          <button onClick={onLoyaltyClick} className="cta-outline-dark cursor-pointer">
            Learn More
          </button>
        </div>

        <p className="font-mono text-[10px] mt-8" style={{ color: 'rgba(10,9,8,0.3)' }}>
          POWERED BY FUDR — INDIA'S LEADING LOYALTY PLATFORM
        </p>
      </div>
    </section>
  );
}
