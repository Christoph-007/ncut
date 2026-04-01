import { useState, useRef, useEffect } from 'react';

/**
 * ComparisonSlider — ported from blocks/comparison-slider.liquid
 * Implements native drag mechanics and CSS clip-path to reveal 'Before' & 'After' images.
 */
export default function ComparisonSlider({
  beforeImage = '',
  afterImage = '',
  beforeText = 'Before',
  afterText = 'After',
  orientation = 'horizontal', // 'horizontal' | 'vertical'
  aspectRatio = '16 / 9',
  showText = true
}) {
  const [comparePct, setComparePct] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    if (orientation === 'horizontal') {
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setComparePct((x / rect.width) * 100);
    } else {
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      setComparePct((y / rect.height) * 100);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX, e.clientY);
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, orientation]);

  // CSS Clip-path calculations exactly matching Shopify's formula
  const beforeClipPath = orientation === 'horizontal'
    ? `inset(0 calc(${100 - comparePct}% ) 0 0)`
    : `inset(0 0 calc(${comparePct}% ) 0)`;

  const afterClipPath = orientation === 'horizontal'
    ? `inset(0 0 0 calc(${comparePct}% ))`
    : `inset(calc(${100 - comparePct}% ) 0 0 0)`;

  return (
    <div 
      className={`comparison-slider orientation--${orientation}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: aspectRatio,
        overflow: 'hidden',
        borderRadius: 'var(--border-radius-base, 8px)',
        userSelect: 'none',
        backgroundColor: 'var(--color-secondary, #f4f4f4)'
      }}
      ref={containerRef}
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX, e.clientY); }}
      onTouchStart={(e) => {
        setIsDragging(true);
        if(e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
      {/* Before Layer */}
      <div 
        className="comparison-layer layer-before"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          clipPath: beforeClipPath, transition: isDragging ? 'none' : 'clip-path 0.1s ease',
          zIndex: 1
        }}
      >
        <img 
          src={beforeImage || 'https://picsum.photos/800/600?grayscale'} 
          alt={beforeText} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} 
        />
        {showText && beforeText && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem', padding: '0.5rem 1rem',
            backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '4px',
            fontSize: '0.875rem', fontWeight: 'bold'
          }}>
            {beforeText}
          </div>
        )}
      </div>

      {/* After Layer */}
      <div 
        className="comparison-layer layer-after"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          clipPath: afterClipPath, transition: isDragging ? 'none' : 'clip-path 0.1s ease',
          zIndex: 2
        }}
      >
        <img 
          src={afterImage || 'https://picsum.photos/800/600'} 
          alt={afterText} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} 
        />
        {showText && afterText && (
          <div style={{
            position: 'absolute', bottom: '1rem', right: '1rem', padding: '0.5rem 1rem',
            backgroundColor: 'currentColor', color: 'var(--color-background)', borderRadius: '4px',
            fontSize: '0.875rem', fontWeight: 'bold'
          }}>
            {afterText}
          </div>
        )}
      </div>

      {/* Drag Handle UI */}
      <div 
        className="comparison-handle"
        style={{
          position: 'absolute',
          ...(orientation === 'horizontal' 
            ? { left: `${comparePct}%`, top: 0, bottom: 0, width: '4px', transform: 'translateX(-50%)' } 
            : { top: `${100 - comparePct}%`, left: 0, right: 0, height: '4px', transform: 'translateY(-50%)' }
          ),
          backgroundColor: 'white', cursor: orientation === 'horizontal' ? 'ew-resize' : 'ns-resize',
          zIndex: 10, boxShadow: '0 0 10px rgba(0,0,0,0.3)'
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '32px', height: '32px', backgroundColor: 'white', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
        }}>
          {orientation === 'horizontal' ? (
            <>
              <span style={{ fontSize: '10px', color: '#666' }}>◀</span>
              <span style={{ fontSize: '10px', color: '#666' }}>▶</span>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
               <span style={{ fontSize: '10px', color: '#666', lineHeight: '10px' }}>▲</span>
               <span style={{ fontSize: '10px', color: '#666', lineHeight: '10px' }}>▼</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Hidden Native Input Accessibility Bridge */}
      <input 
        type="range" min="0" max="100" value={comparePct} 
        onChange={(e) => setComparePct(Number(e.target.value))}
        style={{ position: 'absolute', opacity: 0, zIndex: -1 }} 
        aria-label="Image comparison slider"
      />
    </div>
  );
}
