import { useState } from 'react';

/**
 * CardGallery — ported from snippets/card-gallery.liquid
 * Specialized image grid and slider handler specifically designed for the PDP (Product Display Page).
 */
export default function CardGallery({ 
  images = [], 
  altText = "Product image", 
  layout = "thumbnails-bottom" // or 'grid' 
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className={`card-gallery layout--${layout}`} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Main Viewport */}
      <div 
        className="card-gallery__main"
        style={{
          position: 'relative', width: '100%', aspectRatio: '4/5',
          borderRadius: 'var(--border-radius-base)', overflow: 'hidden',
          backgroundColor: 'var(--color-secondary)'
        }}
      >
        <img 
          src={images[activeIndex]} 
          alt={`${altText} view ${activeIndex + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Navigation Arrows (if multiple) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={() => setActiveIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
              style={{
                position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)',
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10
              }}
            >
              ←
            </button>
            <button 
              onClick={() => setActiveIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
              style={{
                position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)',
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10
              }}
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div 
          className="card-gallery__thumbnails"
          style={{
            display: 'flex', gap: '0.75rem', overflowX: 'auto',
            paddingBottom: '0.5rem', scrollbarWidth: 'none'
          }}
        >
          {images.map((img, index) => (
            <button
              key={`${img}-${index}`}
              onClick={() => setActiveIndex(index)}
              style={{
                width: '80px', height: '100px', flexShrink: 0, padding: 0,
                border: index === activeIndex ? '2px solid var(--color-foreground)' : '2px solid transparent',
                borderRadius: '4px', overflow: 'hidden', cursor: 'pointer',
                transition: 'border-color 0.2s', backgroundColor: 'var(--color-secondary)'
              }}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
