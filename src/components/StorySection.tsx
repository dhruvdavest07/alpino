export default function StorySection() {
  return (
    <section id="story" className="snap-section py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--void)' }}>
      {/* Editorial depth number */}
      <div className="editorial-number top-0 right-0 md:right-12">01</div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left: Pull quote (45%) */}
        <div className="lg:col-span-5 reveal-item">
          <div className="pull-quote">
            <blockquote className="font-display-italic text-[clamp(24px,3vw,36px)] leading-[1.3]" style={{ color: 'var(--cream)' }}>
              "High-protein food should taste amazing. That's not a compromise — that's a standard."
            </blockquote>
          </div>
          <p className="font-mono text-[10px] mt-6 tracking-widest" style={{ color: 'var(--peanut)' }}>
            — ALPINO HEALTH FOODS · FOUNDED 2016
          </p>

          <div className="mt-10">
            <p className="font-mono text-sm tracking-[0.3em] mb-4" style={{ color: 'var(--gold)' }}>OUR STORY</p>
            <h2 className="font-athletic text-[clamp(36px,5vw,56px)] leading-[0.95] mb-6" style={{ color: 'var(--cream)' }}>
              From Surat<br />To The World
            </h2>
            <p className="font-body text-lg leading-relaxed mb-8" style={{ color: 'rgba(245,237,216,0.5)' }}>
              Founded in 2016, Alpino started with a simple belief: high-protein food should taste amazing. Featured on Shark Tank India Season 1, endorsed by Shilpa Shetty, we're now building healthy protein habits in 15+ countries with 70+ products and a 10M+ community.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ v: '15+', l: 'Countries' }, { v: 'S1', l: 'Shark Tank' }, { v: '2016', l: 'Founded' }].map((s, i) => (
                <div key={i} className="glass-card p-4 text-center">
                  <p className="font-athletic text-2xl mb-1" style={{ color: 'var(--cream)' }}>{s.v}</p>
                  <p className="font-body text-sm" style={{ color: 'rgba(245,237,216,0.4)' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Image stack (55%) */}
        <div className="lg:col-span-7 reveal-item image-stack">
          <div className="relative">
            <div className="image-stack-item w-full h-[400px] md:h-[500px] relative z-10">
              <img src="/story_kitchen.png" alt="Alpino Kitchen" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="image-stack-item absolute -top-6 -right-6 w-48 h-64 z-20 hidden lg:block" style={{ transform: 'rotate(3deg)' }}>
              <img src="/pro_bowl.png" alt="Protein Bowl" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="image-stack-item absolute -bottom-8 -left-8 w-44 h-56 z-20 hidden lg:block" style={{ transform: 'rotate(-2deg)' }}>
              <img src="/smoothie_bowl.png" alt="Smoothie" loading="lazy" className="w-full h-full object-cover" />
            </div>
            {/* Year badge */}
            <div className="absolute -bottom-6 right-8 z-30 rounded-2xl p-5 shadow-xl" style={{ background: 'var(--peanut)' }}>
              <p className="font-display text-3xl text-white">2016</p>
              <p className="font-body text-sm text-white/70">Founded in Surat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
