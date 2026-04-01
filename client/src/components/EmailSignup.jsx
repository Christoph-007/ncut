import { useState } from 'react';

/**
 * EmailSignup — ported from blocks/email-signup.liquid
 * Floating input form designed specifically for newsletters, mimicking Shopify's Customer Forms.
 */
export default function EmailSignup({ 
  placeholder = "Email Address",
  buttonText = "Subscribe",
  width = "100%",
  onSubscribe 
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    // Simulate API call to newsletter service (or trigger prop)
    try {
      if (onSubscribe) {
        await onSubscribe(email);
      } else {
        await new Promise(r => setTimeout(r, 800)); // Default mock delay
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="email-signup-block" style={{ width: width }}>
      {status === 'success' ? (
        <div 
          style={{ 
            padding: '1rem', 
            backgroundColor: 'rgba(0,128,0,0.1)', 
            border: '1px solid green', 
            color: 'green',
            borderRadius: '4px',
            textAlign: 'center'
          }}
        >
          <svg style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          Thanks for subscribing!
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit}
          className="newsletter-form"
          style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            maxWidth: '400px',
            borderBottom: '1px solid var(--color-foreground)',
            transition: 'border-color 0.2s ease'
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder={placeholder}
            autoCapitalize="off"
            autoComplete="email"
            required
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0.75rem 3rem 0.75rem 0',
              fontSize: '1rem',
              color: 'var(--color-foreground)',
              outline: 'none', // relying on border container for focus styling in CSS
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            aria-label={buttonText}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'var(--color-foreground)',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: status === 'loading' ? 0.5 : 1
            }}
          >
            {status === 'loading' ? (
               <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            )}
          </button>
        </form>
      )}

      {status === 'error' && (
        <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Please enter a valid email address.
        </div>
      )}
    </div>
  );
}
