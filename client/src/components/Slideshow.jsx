import { useState, useEffect } from 'react';

/**
 * Slideshow — ported from assets/slideshow.js and sections/slideshow.liquid
 * Handles automatic and manual slideshow mechanics using React state.
 */
export default function Slideshow({ 
  slides = [], 
  autoPlay = true, 
  interval = 5000 
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, slides.length, interval]);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="slideshow-wrapper" style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '500px' }}>
      <div 
        className="slideshow-track" 
        style={{ 
          display: 'flex', 
          height: '100%',
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: 'transform 0.5s ease-in-out'
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="slideshow-slide" style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
            {slide.image && (
              <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
            {(slide.title || slide.content) && (
              <div 
                className="slide-content"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.3)',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                {slide.title && <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{slide.title}</h2>}
                {slide.content && <p>{slide.content}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="slideshow-controls" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem' }}>
          <button onClick={prevSlide} style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '4px', color: 'white' }}>Prev</button>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {slides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                style={{ 
                  width: '12px', height: '12px', borderRadius: '50%', 
                  background: i === currentSlide ? 'white' : 'rgba(255,255,255,0.5)'
                }}
              />
            ))}
          </div>
          <button onClick={nextSlide} style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '4px', color: 'white' }}>Next</button>
        </div>
      )}
    </div>
  );
}
