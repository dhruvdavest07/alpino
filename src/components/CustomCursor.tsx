import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (innerRef.current) {
        innerRef.current.style.left = e.clientX + 'px';
        innerRef.current.style.top = e.clientY + 'px';
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf: number;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.12);
      if (outerRef.current) {
        outerRef.current.style.left = pos.current.x + 'px';
        outerRef.current.style.top = pos.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnterCta = () => {
      outerRef.current?.classList.add('cursor-cta');
      outerRef.current?.classList.remove('cursor-image');
      if (textRef.current) textRef.current.textContent = 'CLICK';
    };
    const onEnterImg = () => {
      outerRef.current?.classList.add('cursor-image');
      outerRef.current?.classList.remove('cursor-cta');
      if (textRef.current) textRef.current.textContent = 'VIEW';
    };
    const onLeave = () => {
      outerRef.current?.classList.remove('cursor-cta', 'cursor-image');
      if (textRef.current) textRef.current.textContent = '';
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    const observe = () => {
      document.querySelectorAll('button, a, .cta-primary, .cta-gold, .cta-shimmer, .cta-outline, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterCta);
        el.addEventListener('mouseleave', onLeave);
      });
      document.querySelectorAll('img, .image-overlay').forEach(el => {
        el.addEventListener('mouseenter', onEnterImg);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    observe();
    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="custom-cursor-outer">
        <span ref={textRef} className="cursor-text"></span>
      </div>
      <div ref={innerRef} className="custom-cursor-inner" />
    </>
  );
}
