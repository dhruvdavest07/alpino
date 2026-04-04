import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Priya M.', role: 'Fitness Coach', text: 'Alpino changed my meal prep game. 35g protein in a wrap? No brainer.', rating: 5 },
  { name: 'Arjun K.', role: 'Software Engineer', text: 'Finally a cafe that gets macros. I eat here 4 times a week.', rating: 5 },
  { name: 'Simran T.', role: 'Yoga Instructor', text: 'Clean food that actually tastes incredible. The smoothie bowls are next level.', rating: 5 },
  { name: 'Rahul D.', role: 'College Athlete', text: 'Best protein food I have found. The Korean Soba Bowl is unreal.', rating: 5 },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="testimonial-card-item">
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array(t.rating).fill(0).map((_, j) => (
          <Star key={j} className="w-4 h-4 fill-[#E8B84B] text-[#E8B84B]" />
        ))}
      </div>
      {/* Quote */}
      <p className="font-display-italic text-base leading-relaxed mb-5" style={{ color: 'var(--cream)' }}>
        "{t.text}"
      </p>
      {/* Avatar + info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, var(--peanut), var(--gold))', color: 'var(--void)' }}>
          {t.name[0]}
        </div>
        <div>
          <p className="font-body font-bold text-sm" style={{ color: 'var(--cream)' }}>{t.name}</p>
          <p className="font-mono text-[9px]" style={{ color: 'var(--ember)' }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  // Duplicate for infinite marquee
  const row1 = [...testimonials, ...testimonials, ...testimonials];
  const row2 = [...testimonials.reverse(), ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="snap-section py-24 md:py-32 overflow-hidden" style={{ background: 'var(--void)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <p className="font-mono text-sm tracking-[0.3em] mb-4" style={{ color: 'var(--gold)' }}>// REVIEWS</p>
        <h2 className="font-athletic text-[clamp(48px,6vw,96px)] leading-[0.9]" style={{ color: 'var(--cream)' }}>
          What People Say
        </h2>
      </div>

      {/* Row 1: left-to-right, faster */}
      <div className="marquee-container mb-6">
        <div className="testimonial-marquee-row animate-marquee" style={{ animationDuration: '35s' }}>
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2: right-to-left, slower */}
      <div className="marquee-container">
        <div className="testimonial-marquee-row animate-marquee-reverse" style={{ animationDuration: '42s' }}>
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
