import { ArrowRight } from 'lucide-react';

interface FranchiseSectionProps {
  onFranchiseClick: () => void;
}

export default function FranchiseSection({ onFranchiseClick }: FranchiseSectionProps) {
  return (
    <section id="franchise" className="snap-section py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--void)' }}>
      {/* Editorial depth number */}
      <div className="editorial-number bottom-0 left-0 md:left-12">02</div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px]" style={{ background: 'var(--gold)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[120px]" style={{ background: 'var(--peanut)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="reveal-item">
          <p className="font-mono text-sm tracking-[0.3em] mb-4" style={{ color: 'var(--gold)' }}>// FRANCHISE</p>
          <h2 className="font-athletic text-[clamp(48px,6vw,72px)] leading-[0.9] mb-6" style={{ color: 'var(--cream)' }}>
            Bring Alpino<br />To Your City
          </h2>
          <p className="font-body text-lg leading-relaxed mb-8" style={{ color: 'rgba(245,237,216,0.5)' }}>
            COCO franchise models with proven systems, full training, marketing, and supply chain support. Join India's fastest-growing protein cafe brand.
          </p>
          <button onClick={onFranchiseClick} className="cta-gold cursor-pointer flex items-center gap-2">
            Apply Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="reveal-item grid grid-cols-2 gap-4">
          {[
            { v: '₹20L+', l: 'Investment' },
            { v: 'COCO', l: 'Model' },
            { v: 'Full', l: 'Training' },
            { v: '360°', l: 'Support' },
          ].map((s, i) => (
            <div key={i} className="glass-card p-6 text-center hover:bg-white/[0.06] transition-all duration-300 cursor-pointer group">
              <p className="font-athletic text-3xl mb-1 transition-colors duration-300 group-hover:text-[#E8B84B]" style={{ color: 'var(--cream)' }}>
                {s.v}
              </p>
              <p className="font-body text-sm" style={{ color: 'rgba(245,237,216,0.4)' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
