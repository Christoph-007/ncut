import { useState, useRef, useEffect } from 'react';

/**
 * Carousel — ported from sections/carousel.liquid
 * Generic, structurally identical reproduction of the liquid swipe carousel.
 */
export default function Carousel({ 
  children, 
  title = "", 
  itemsPerView = { mobile: 1, laptop: 3, desktop: 4 },
  gap = 16 
}) {
  const trackRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  
  useEffect(() => {
    // Only show controls if there's enough overflow
    if (trackRef.current) {
      setShowControls(trackRef.current.scrollWidth > trackRef.current.clientWidth);
    }
  }, [children]);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.clientWidth * 0.8;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="carousel-section" style={{ padding: '4rem 0', width: '100%', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative' }}>
        
        {title && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.25rem', margin: 0 }}>{title}</h2>
            
            {showControls && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => scroll('left')}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-secondary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <button 
                  onClick={() => scroll('right')}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-secondary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}

        <div 
          ref={trackRef}
          className="carousel-track hide-scrollbar"
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            gap: `${gap}px`,
            paddingBottom: '1rem', // Space for scrollbar if forced
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none' // IE/Edge
          }}
        >
          {/* React Children Injection */}
          {children}
        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
