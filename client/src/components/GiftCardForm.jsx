import { useState } from 'react';

/**
 * GiftCardForm — ported from assets/gift-card-recipient-form.js
 * Validates and triggers gift-card email deliveries.
 */
export default function GiftCardForm({ product, onAddToCart }) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [sendOn, setSendOn] = useState('');
  const [isGift, setIsGift] = useState(false);

  // Inherited styling from template-giftcard.css
  const styles = {
    formGroup: { marginBottom: '1rem' },
    label: { display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-muted)' },
    input: { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-secondary)', color: 'white' }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (isGift && !recipientEmail) {
      alert("Recipient email is required for gift cards.");
      return;
    }
    
    // Package properties specific for actual cart integration
    const properties = isGift ? {
      '_recipient_email': recipientEmail,
      '_recipient_name': recipientName,
      '_gift_message': message,
      '_send_on': sendOn
    } : {};

    onAddToCart?.(product, properties);
  };

  return (
    <div className="gift-card-form" style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
        <input 
          type="checkbox" 
          checked={isGift} 
          onChange={(e) => setIsGift(e.target.checked)} 
          style={{ width: 'auto' }}
        />
        <span>I want to send this as a gift</span>
      </label>

      {isGift && (
        <div className="gift-card-fields" style={{ animation: 'fadeInUp 0.3s ease' }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Recipient Email *</label>
            <input 
              type="email" 
              required 
              style={styles.input} 
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="friend@example.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Recipient Name (Optional)</label>
            <input 
              type="text" 
              style={styles.input} 
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Jane Doe"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Message (Optional, Max 200 cols)</label>
            <textarea 
              maxLength="200" 
              style={{ ...styles.input, resize: 'vertical', minHeight: '80px' }} 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Send Date (Optional)</label>
            <input 
              type="date" 
              style={styles.input} 
              value={sendOn}
              onChange={(e) => setSendOn(e.target.value)}
            />
          </div>
        </div>
      )}

      <button onClick={handleAdd} className="btn btn--primary" style={{ width: '100%', marginTop: '1rem' }}>
        Add to Cart
      </button>
    </div>
  );
}
