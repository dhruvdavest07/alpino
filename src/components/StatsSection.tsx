import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Menu Items', value: 43, suffix: '+', unit: '+' },
  { label: 'Avg Protein Per Meal', value: 30, suffix: 'g', unit: 'g' },
  { label: 'Countries Reached', value: 15, suffix: '+', unit: '+' },
  { label: 'Pure Vegetarian', value: 100, suffix: '%', unit: '%' },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          stats.forEach((stat, i) => {
            const counterEl = counterRefs.current[i];
            if (!counterEl) return;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                counterEl.textContent = Math.round(obj.val) + stat.suffix;
              },
            });
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="snap-section py-24 md:py-32"
      style={{ background: 'var(--cream)', color: 'var(--void)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center">
              <div className="text-center px-8 md:px-12">
                <span
                  ref={(el) => { counterRefs.current[i] = el; }}
                  className="font-athletic text-[clamp(48px,6vw,96px)] leading-none tabular-nums"
                  style={{ color: 'var(--void)' }}
                >
                  0{stat.suffix}
                </span>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <p className="font-body text-sm" style={{ color: 'rgba(10,9,8,0.6)' }}>
                    {stat.label}
                  </p>
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block stat-separator" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
