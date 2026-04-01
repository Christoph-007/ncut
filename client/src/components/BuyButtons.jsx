import { useState } from 'react';
import { useCart } from '../context/CartContext';

/**
 * BuyButtons — ported from blocks/buy-buttons.liquid & accelerated-checkout.liquid
 * Handles "Add to Cart" and dynamic checkout routing (like Shop Pay).
 */
export default function BuyButtons({ 
  product, 
  variantId, 
  quantity = 1,
  showDynamicCheckout = true,
  disabled = false
}) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Validate variant
  const variant = product?.variants?.find(v => v.id === variantId) || product?.variants?.[0];
  const isAvailable = variant?.price !== undefined;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAvailable || disabled) return;
    
    setIsAdding(true);
    try {
      await addToCart(product, variant, quantity);
      // Optional: trigger cart drawer open here if cart context supports it
    } catch (err) {
      console.error('Failed to add to cart', err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDynamicCheckout = (e) => {
    e.preventDefault();
    if (!isAvailable || disabled) return;
    // Route user directly to checkout flow with this item
    window.location.href = `/checkout?variant=${variant.id}&qty=${quantity}`;
  };

  return (
    <div className="buy-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      
      {/* Primary Add To Cart Button */}
      <button 
        type="button"
        onClick={handleAddToCart}
        disabled={!isAvailable || disabled || isAdding}
        className={`btn ${showDynamicCheckout ? 'btn--secondary' : 'btn--primary'}`}
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1rem',
          fontWeight: '600',
          borderRadius: '4px',
          cursor: (!isAvailable || disabled) ? 'not-allowed' : 'pointer',
          opacity: (!isAvailable || disabled) ? 0.6 : 1,
          backgroundColor: showDynamicCheckout ? 'transparent' : 'var(--color-foreground)',
          color: showDynamicCheckout ? 'var(--color-foreground)' : 'var(--color-background)',
          border: '1px solid var(--color-foreground)',
          transition: 'all 0.2s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        {isAdding ? (
          <span className="spinner" style={{ width: '20px', height: '20px', border: '2px solid', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
        ) : (
           isAvailable ? 'Add to Cart' : 'Sold Out'
        )}
      </button>

      {/* Accelerated Checkout / Shop Pay / PayPal simulated block */}
      {showDynamicCheckout && isAvailable && (
        <div className="accelerated-checkout-container" style={{ width: '100%' }}>
          <button
            type="button"
            onClick={handleDynamicCheckout}
            disabled={disabled}
            className="btn btn--dynamic-checkout"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '4px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              backgroundColor: '#5A31F4', // Shop Pay purple simulation
              color: 'white',
              border: 'none',
              transition: 'transform 0.1s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Buy with <strong>Shop Pay</strong>
          </button>
        </div>
      )}

      {/* Recaptcha / Legal text usually paired with dynamic checkout */}
      {showDynamicCheckout && (
        <p style={{ fontSize: '0.75rem', textAlign: 'center', color: 'var(--color-muted)', margin: 0 }}>
          More payment options available at checkout.
        </p>
      )}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .btn--dynamic-checkout:hover { opacity: 0.9; }
        .btn--dynamic-checkout:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
}
