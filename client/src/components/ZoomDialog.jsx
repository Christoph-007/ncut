import { useState, useRef, useEffect } from 'react';

/**
 * ZoomDialog — ported from assets/zoom-dialog.js
 * An image magnification overlay for deep product inspection.
 */
export default function ZoomDialog({ imageSrc, isOpen, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) {
      setZoomLevel(1);
      setOffset({ x: 0, y: 0 });
    }
  }, [isOpen]);

  if (!isOpen || !imageSrc) return null;

  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;
    
    setOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const toggleZoom = () => {
    if (zoomLevel === 1) {
      setZoomLevel(2.5);
    } else {
      setZoomLevel(1);
      setOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div 
      className="zoom-dialog-overlay"
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        backgroundColor: 'rgba(0,0,0,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: zoomLevel > 1 ? 'grab' : 'zoom-in'
      }}
    >
      <button 
        onClick={onClose} 
        style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', zIndex: 2010 }}
      >
        Close
      </button>

      {zoomLevel > 1 && (
        <div style={{ position: 'absolute', bottom: '2rem', display: 'flex', gap: '1rem', zIndex: 2010 }}>
          <button onClick={() => setZoomLevel(p => Math.max(1, p - 0.5))} className="btn btn--primary">- Zoom Out</button>
          <button onClick={() => setZoomLevel(p => Math.min(4, p + 0.5))} className="btn btn--primary">+ Zoom In</button>
        </div>
      )}

      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onDoubleClick={toggleZoom}
        style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <img 
          src={imageSrc} 
          alt="Zoomed Product" 
          draggable="false"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomLevel})`,
            transition: isDragging.current ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
            maxHeight: '90vh',
            maxWidth: '90vw',
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  );
}
