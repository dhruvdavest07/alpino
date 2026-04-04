import { useState, useEffect } from 'react';

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2200);
    const done = setTimeout(onComplete, 2800);
    return () => { clearTimeout(timer); clearTimeout(done); };
  }, [onComplete]);

  return (
    <div className={`page-loader ${fadeOut ? 'fade-out' : ''}`}>
      {/* SVG Wordmark with stroke draw */}
      <svg width="220" height="60" viewBox="0 0 220 60" className="overflow-visible">
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="none"
          stroke="#F5EDD8"
          strokeWidth="1.2"
          fontSize="48"
          fontFamily="'Playfair Display', serif"
          fontWeight="700"
          letterSpacing="3"
          style={{
            strokeDasharray: 600,
            strokeDashoffset: 600,
            animation: 'stroke-draw 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
          }}
        >
          Alpino
        </text>
        {/* Fill reveal after stroke */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="#F5EDD8"
          fontSize="48"
          fontFamily="'Playfair Display', serif"
          fontWeight="700"
          letterSpacing="3"
          opacity="0"
          style={{
            animation: 'fadeInUp 0.6s ease 1.4s forwards',
          }}
        >
          Alpino
        </text>
      </svg>

      {/* Gold line fill */}
      <div className="loader-line">
        <div className="loader-line-fill" />
      </div>

      {/* Tagline */}
      <p
        className="font-data text-[10px] tracking-[0.3em] opacity-0"
        style={{
          color: 'rgba(245,237,216,0.4)',
          animation: 'fadeInUp 0.5s ease 1.2s forwards',
        }}
      >
        PROTEIN CAFE
      </p>
    </div>
  );
}
