import { useState } from 'react';

/**
 * PopupLink — Converted from blocks/popup-link.liquid
 * Trigger button that opens a modal or drawer with content.
 *
 * Props:
 *   label     {string}   — button label
 *   children  {ReactNode} — content shown in the dialog
 *   type      {string}   — 'modal' | 'drawer'
 *   styleClass {string}
 */
export default function PopupLink({ label = 'Open', children, type = 'modal', styleClass = 'button-unstyled' }) {
  const [open, setOpen] = useState(false);

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    display: 'flex',
    alignItems: type === 'drawer' ? 'stretch' : 'center',
    justifyContent: type === 'drawer' ? 'flex-end' : 'center',
  };

  const dialogStyle =
    type === 'drawer'
      ? {
          background: 'var(--color-background, #fff)',
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
        }
      : {
          background: 'var(--color-background, #fff)',
          borderRadius: '8px',
          padding: '2rem',
          maxWidth: '560px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        };

  return (
    <>
      <button type="button" className={`popup-link ${styleClass}`} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open && (
        <div
          style={overlayStyle}
          className={`popup-overlay popup-overlay--${type}`}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div style={dialogStyle} role="dialog" aria-modal="true">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              ×
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
