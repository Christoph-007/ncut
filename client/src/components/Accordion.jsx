import { useState } from 'react';

/**
 * Accordion — ported from snippets/accordion-custom-component.liquid
 * Dropdown toggle wrapper used frequently in FAQ sections or product descriptions.
 */
export default function Accordion({ title, content, isOpenInitial = false }) {
  const [isOpen, setIsOpen] = useState(isOpenInitial);

  return (
    <div className="accordion" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 0',
          backgroundColor: 'transparent',
          color: 'var(--color-foreground)',
          border: 'none',
          fontSize: '1.125rem',
          fontWeight: '500',
          cursor: 'pointer',
          textAlign: 'left'
        }}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span 
          style={{ 
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div
        className="accordion__content"
        style={{
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? 1 : 0
        }}
        aria-hidden={!isOpen}
      >
        <div 
          className="accordion__inner-content rte"
          style={{ paddingBottom: '1.25rem', color: 'var(--color-muted)', lineHeight: '1.6' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
