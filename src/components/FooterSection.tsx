import { Instagram, Linkedin, Mail, Phone, ChevronRight, ArrowRight } from 'lucide-react';

interface FooterSectionProps {
  onMenuClick: () => void;
  onLocationsClick: () => void;
  onFranchiseClick: () => void;
  onLoyaltyClick: () => void;

  onSubscribe: () => void;
  showComingSoon: (feature: string) => void;
}

export default function FooterSection({ onMenuClick, onLocationsClick, onFranchiseClick, onLoyaltyClick, onSubscribe, showComingSoon }: FooterSectionProps) {
  return (
    <footer style={{ background: 'var(--void)' }}>
      {/* Gold top rule */}
      <div className="h-px w-full" style={{ background: 'var(--gold)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Logo + tagline */}
          <div>
            <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--cream)' }}>Alpino</h3>
            <p className="font-body text-sm mb-6 leading-relaxed" style={{ color: 'rgba(245,237,216,0.4)' }}>
              High-protein, macro-friendly fast food for people who refuse to compromise.
            </p>
            <div className="flex gap-3">
              <button onClick={() => showComingSoon('Instagram')} className="social-icon cursor-pointer">
                <Instagram className="w-5 h-5" />
              </button>
              <button onClick={() => showComingSoon('LinkedIn')} className="social-icon cursor-pointer">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Col 2: Nav links */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest mb-4" style={{ color: 'rgba(245,237,216,0.3)' }}>QUICK LINKS</h4>
            <ul className="space-y-3">
              {[
                { l: 'Menu', f: onMenuClick },
                { l: 'Locations', f: onLocationsClick },
                { l: 'Franchise', f: onFranchiseClick },
                { l: 'Loyalty', f: onLoyaltyClick },
              ].map(n => (
                <li key={n.l}>
                  <button onClick={n.f} className="font-mono text-[11px] tracking-wider flex items-center gap-2 cursor-pointer transition-all duration-300 hover:translate-x-1" style={{ color: 'rgba(245,237,216,0.5)' }}>
                    <ArrowRight className="w-3 h-3" style={{ color: 'var(--peanut)' }} /> {n.l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest mb-4" style={{ color: 'rgba(245,237,216,0.3)' }}>CONTACT</h4>
            <ul className="space-y-3 font-body">
              <li className="flex items-center gap-2 text-sm" style={{ color: 'rgba(245,237,216,0.5)' }}>
                <Mail className="w-4 h-4" style={{ color: 'var(--peanut)' }} /> hello@alpinoproteincafe.com
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: 'rgba(245,237,216,0.5)' }}>
                <Phone className="w-4 h-4" style={{ color: 'var(--peanut)' }} /> +91 XXXXX XXXXX
              </li>
              <li className="text-sm mt-4" style={{ color: 'rgba(245,237,216,0.3)' }}>Mon-Sun: 8am-11pm</li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest mb-4" style={{ color: 'rgba(245,237,216,0.3)' }}>STAY UPDATED</h4>
            <p className="font-body text-sm mb-4" style={{ color: 'rgba(245,237,216,0.4)' }}>Get the latest on new menu items and locations.</p>
            <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: 'var(--mist)' }}>
              <input type="email" placeholder="Your email" className="flex-1 px-4 py-3 text-sm outline-none font-body" style={{ background: 'rgba(245,237,216,0.03)', color: 'var(--cream)' }} />
              <button onClick={onSubscribe} className="px-4 py-3 transition-colors cursor-pointer" style={{ background: 'var(--peanut)' }}>
                <ChevronRight className="w-5 h-5" style={{ color: 'var(--cream)' }} />
              </button>
            </div>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <p className="font-body text-sm" style={{ color: 'rgba(245,237,216,0.3)' }}>© 2026 Alpino Protein Cafe. All rights reserved.</p>
          <p className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(245,237,216,0.2)' }}>Powered by Petpooja & FUDR</p>
        </div>

        {/* Watermark */}
        <div className="footer-watermark">ALPINO PROTEIN CAFE</div>
      </div>
    </footer>
  );
}
