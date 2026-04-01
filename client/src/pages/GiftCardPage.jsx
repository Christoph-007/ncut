import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * GiftCardPage — ported from templates/gift_card.liquid
 * Isolated landing portal delivered via email to customers to claim their digital credit.
 * Does NOT utilize the standard store Layout shell.
 */
export default function GiftCardPage() {
  const { code } = useParams();
  const [copied, setCopied] = useState(false);
  
  // Dummy data bridging the liquid object injection
  const giftCard = {
    balance: 100.00,
    currency: 'USD',
    code: code || 'ABCD-1234-EFGH-5678',
    qr_identifier: 'https://ncut.store/gift-cards/demo',
    shop_name: 'NCUT Store'
  };

  const codeRef = useRef(null);

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(giftCard.code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  // Note: Using a direct styling injection here because the original template uses layout: none
  // and loads a specialized template-giftcard.css file.
  return (
    <div 
      className="gift-card-portal"
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.05em' }}>{giftCard.shop_name}</h1>
      </header>

      <main 
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '3rem 2rem',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '3rem', margin: 0 }}>
            ${giftCard.balance.toFixed(2)} <span style={{ fontSize: '1.25rem', color: '#a1a1aa' }}>{giftCard.currency}</span>
          </h2>
          <p style={{ color: '#a1a1aa', marginTop: '0.5rem' }}>Use this code at checkout.</p>
        </div>

        <div 
          style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            border: '1px dashed rgba(255,255,255,0.2)'
          }}
        >
          <strong 
            ref={codeRef}
            style={{ fontSize: '1.5rem', letterSpacing: '2px', fontFamily: 'monospace', wordBreak: 'break-all' }}
          >
            {giftCard.code}
          </strong>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={handleCopy}
            style={{
              padding: '1rem',
              borderRadius: '9999px',
              backgroundColor: copied ? '#22c55e' : '#ffffff',
              color: copied ? '#ffffff' : '#000000',
              border: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {copied ? 'Code Copied!' : 'Copy Code'}
          </button>
          
          <Link 
            to="/"
            style={{
              padding: '1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'transparent',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Start Shopping
          </Link>
        </div>
      </main>
    </div>
  );
}
