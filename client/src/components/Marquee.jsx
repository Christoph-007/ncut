import { useEffect, useRef, useState } from 'react';

/**
 * Marquee — ported from assets/marquee.js and sections/marquee.liquid
 * Infinite scrolling text bar utilizing CSS animations and React refs for seamless cloning.
 */
export default function Marquee({ text = "Announcing our new collection!", speed = 50 }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [clones, setClones] = useState(1);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    
    // Calculate how many clones we need to fill the screen seamlessly
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = contentRef.current.offsetWidth;
    
    if (contentWidth > 0) {
      const clonesNeeded = Math.ceil(containerWidth / contentWidth) + 1;
      setClones(clonesNeeded);
    }
  }, [text]);

  const animationDuration = text.length * 0.2 * (100 / speed); // Rough estimation

  return (
    <div 
      ref={containerRef}
      className="marquee-container" 
      style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', background: 'var(--color-secondary)' }}
    >
      <div 
        className="marquee-track"
        style={{ 
          display: 'flex', 
          animation: `marquee-scroll ${animationDuration}s linear infinite` 
        }}
      >
        {Array.from({ length: clones }).map((_, i) => (
          <div 
            key={i} 
            ref={i === 0 ? contentRef : null}
            className="marquee-content"
            style={{ padding: '0.75rem 2rem', fontSize: '1.125rem', fontWeight: 'bold' }}
          >
            {text}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
