import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * AnnouncementBar — ported from sections/header-announcements.liquid
 * The topmost sticky/static bar for global marketing messages.
 */
export default function AnnouncementBar({ 
  messages = [{ text: "Free shipping on orders over $100", link: "/collections" }],
  autoPlay = true,
  interval = 5000,
  colorScheme = "scheme-2"
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || messages.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, messages.length, interval]);

  if (!messages || messages.length === 0) return null;

  const currentMessage = messages[currentIndex];

  return (
    <div 
      className={`announcement-bar color-${colorScheme}`}
      style={{
        width: '100%',
        backgroundColor: 'var(--color-secondary, #18181b)', // Zinc 900
        color: 'var(--color-foreground, #fafafa)', // Zinc 50
        textAlign: 'center',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        letterSpacing: '0.025em',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        zIndex: 50
      }}
    >
      <div 
        key={currentIndex} 
        style={{ animation: 'fadeIn 0.5s ease-in-out' }}
      >
        {currentMessage.link ? (
          <Link 
            to={currentMessage.link}
            style={{ color: 'inherit', textDecoration: 'none', display: 'inline-block', padding: '0.25rem 0' }}
          >
            {currentMessage.text}
          </Link>
        ) : (
          <span style={{ display: 'inline-block', padding: '0.25rem 0' }}>{currentMessage.text}</span>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
