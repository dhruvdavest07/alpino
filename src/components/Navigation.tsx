import { useEffect, useState } from 'react';
import { MapPin, X, Menu, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavProps {
  onMenuClick: () => void;
  onLocationsClick: () => void;
  onFranchiseClick: () => void;
  onLoyaltyClick: () => void;
  onOrderClick: () => void;
}

export default function Navigation({ onMenuClick, onLocationsClick, onFranchiseClick, onLoyaltyClick, onOrderClick }: NavProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = [
    { label: 'Menu', fn: onMenuClick },
    { label: 'Locations', fn: onLocationsClick },
    { label: 'Franchise', fn: onFranchiseClick },
    { label: 'Loyalty', fn: onLoyaltyClick },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
        scrolled
          ? 'h-[60px] bg-earth/95 backdrop-blur-xl border-b border-[rgba(245,237,216,0.05)]'
          : 'h-[72px] bg-transparent'
      }`}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {/* Leaf icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 8.5-3.5 9.5-11.5l.5-3.5-2 3z" fill="currentColor" opacity="0.8"/>
        </svg>
        <span className="font-display text-cream text-xl tracking-wide">Alpino</span>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map(n => (
          <button
            key={n.label}
            onClick={n.fn}
            className="group relative text-[12px] font-body font-medium text-cream/60 uppercase tracking-[3px] hover:text-cream transition-colors duration-300 cursor-pointer"
          >
            {n.label.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-300 group-hover:translate-y-[-2px]"
                style={{ transitionDelay: `${i * 25}ms` }}
              >
                {char}
              </span>
            ))}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative w-10 h-10 rounded-full border border-cream/10 flex items-center justify-center hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-cream/70" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-ember text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-in">
              {totalItems}
            </span>
          )}
        </button>

        <button
          onClick={onOrderClick}
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-gold/50 text-gold text-[11px] font-body font-semibold uppercase tracking-[2px] hover:bg-gold hover:text-void transition-all duration-350 cursor-pointer"
        >
          Order Now
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 rounded-full border border-cream/10 flex items-center justify-center text-cream cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-void/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden z-40"
          style={{ clipPath: 'inset(0 0 0 0)' }}
        >
          {navLinks.map((n, i) => (
            <button
              key={n.label}
              onClick={() => { n.fn(); setMobileOpen(false); }}
              className="font-display text-3xl text-cream hover:text-gold transition-colors duration-300 cursor-pointer opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => { onOrderClick(); setMobileOpen(false); }}
            className="mt-4 cta-shimmer text-lg cursor-pointer opacity-0 animate-fade-in-up"
            style={{ animationDelay: '240ms', animationFillMode: 'forwards' }}
          >
            Order Now
          </button>
        </div>
      )}
    </nav>
  );
}
