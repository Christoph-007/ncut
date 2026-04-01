import { useState } from 'react';
import QuickAddModal from './QuickAddModal';

/**
 * ProductHotspots — ported from sections/product-hotspots.liquid
 * Image wrapper that positions absolutely positioned "dots" over an image, triggering QuickAdd Modals.
 */
export default function ProductHotspots({ 
  imageSrc = '/placeholder.jpg', 
  heading = "Shop the Look",
  hotspots = [
    { id: 1, x: 40, y: 40, product: { title: "Sample Shirt", variants: [{ price: 29.99 }] } },
    { id: 2, x: 60, y: 60, product: { title: "Sample Pants", variants: [{ price: 49.99 }] } }
  ]
}) {
  const [activeProduct, setActiveProduct] = useState(null);

  return (
    <section className="product-hotspots-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div 
        className="hotspots-wrapper" 
        style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '16/9',
          backgroundColor: '#111' 
        }}
      >
        {heading && (
          <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
            <h2 style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{heading}</h2>
          </div>
        )}

        <img 
          src={imageSrc} 
          alt="Hotspots Background" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
        />

        {hotspots.map(hotspot => (
          <button
            key={hotspot.id}
            onClick={() => setActiveProduct(hotspot.product)}
            className="hotspot-dot"
            style={{
              position: 'absolute',
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '36px',
              height: '36px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              border: '2px solid white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.2)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
          >
            <div style={{ width: '12px', height: '12px', backgroundColor: 'white', borderRadius: '50%' }} />
          </button>
        ))}
      </div>

      <QuickAddModal 
        isOpen={!!activeProduct} 
        product={activeProduct} 
        onClose={() => setActiveProduct(null)} 
      />
    </section>
  );
}
