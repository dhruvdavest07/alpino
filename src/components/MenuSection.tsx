import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  protein: number;
  calories: number;
  price: number;
  image: string;
  category: string;
}

interface MenuSectionProps {
  items: MenuItem[];
  onMenuClick: () => void;
  onOrderItem: (item: MenuItem) => void;
}

export default function MenuSection({ items, onMenuClick, onOrderItem }: MenuSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add('!cursor-grabbing');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onLeave = () => { isDown = false; el.classList.remove('!cursor-grabbing'); };
    const onUp = () => { isDown = false; el.classList.remove('!cursor-grabbing'); };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section id="menu" className="snap-section py-24 md:py-32" style={{ background: 'var(--void)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="reveal-item mb-16">
          <p className="font-mono text-sm tracking-[0.3em] mb-4" style={{ color: 'var(--gold)' }}>
            // WHAT WE MAKE
          </p>
          <h2 className="font-athletic text-[clamp(48px,6vw,96px)] leading-[0.9]" style={{ color: 'var(--cream)' }}>
            Chef's Favourites
          </h2>
        </div>

        {/* Horizontal scroll cards */}
        <div ref={scrollRef} className="horizontal-scroll-container gap-6 pb-6 reveal-item">
          {items.map((item) => (
            <div key={item.id} className="horizontal-scroll-item w-[340px] md:w-[380px] menu-card group">
              {/* Image with overlay gradient */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="menu-card-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-transparent to-transparent" />

                {/* Floating protein badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: 'var(--ember)' }}>
                  <span className="font-mono text-[10px] text-white font-bold tracking-wider">{item.protein}g PROTEIN</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <p className="font-mono text-[10px] mb-2" style={{ color: 'var(--sage)' }}>{item.category}</p>
                <h3 className="font-display text-[clamp(18px,2vw,22px)] mb-2" style={{ color: 'var(--cream)' }}>{item.name}</h3>
                <p className="font-body text-sm mb-4 line-clamp-2" style={{ color: 'rgba(245,237,216,0.5)' }}>{item.description}</p>

                {/* Macro strip */}
                <div className="flex gap-2 mb-4">
                  <span className="macro-pill macro-pill-protein">{item.protein}g pro</span>
                  <span className="macro-pill macro-pill-cal">{item.calories} cal</span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <span className="font-body font-bold text-xl" style={{ color: 'var(--gold)' }}>₹{item.price}</span>
                  <div className="menu-card-cta">
                    <button
                      onClick={() => onOrderItem(item)}
                      className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider transition-colors"
                      style={{ color: 'var(--gold)' }}
                    >
                      ADD TO ORDER <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View full menu */}
        <div className="text-center mt-12 reveal-item">
          <button onClick={onMenuClick} className="cta-primary cursor-pointer flex items-center gap-2 mx-auto">
            <ShoppingBag className="w-4 h-4" /> View Full Menu <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
