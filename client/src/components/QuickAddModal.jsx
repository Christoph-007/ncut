import { useState } from 'react';
import useFlyToCart from '../hooks/useFlyToCart';
import { useCart } from '../context/CartContext';

/**
 * QuickAddModal — ported from assets/quick-add.js
 * A popup letting you choose a variant before flying it to the cart.
 */
export default function QuickAddModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const flyToCart = useFlyToCart();
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
  const [adding, setAdding] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    
    // Animate item to cart
    if (e.target) {
      flyToCart(e.target);
    }
    
    await addToCart(product, selectedVariant || product.variants[0], 1);
    setAdding(false);
    onClose();
  };

  return (
    <div 
      className="quick-add-overlay"
      style={{ position: 'fixed', inset: 0, zIndex: 1100, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div 
        className="quick-add-modal"
        onClick={e => e.stopPropagation()}
        style={{ background: 'var(--color-secondary)', padding: '2rem', borderRadius: '8px', maxWidth: '400px', width: '90%', position: 'relative' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
        
        <h3 style={{ marginBottom: '1rem' }}>Quick Add: {product.title}</h3>
        
        {product.images?.[0] && (
          <img src={product.images[0]} alt={product.title} style={{ width: '100%', borderRadius: '4px', marginBottom: '1rem' }} />
        )}
        
        <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          ${selectedVariant?.price?.toFixed(2) || '0.00'}
        </p>

        {product.variants?.length > 1 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-muted)' }}>Select Variant:</label>
            <select 
              value={selectedVariant?._id || ''}
              onChange={(e) => {
                const variant = product.variants.find(v => v._id === e.target.value);
                setSelectedVariant(variant);
              }}
              style={{ width: '100%', padding: '0.5rem', background: 'var(--color-background)', color: 'white', border: '1px solid var(--color-border)', borderRadius: '4px' }}
            >
              {product.variants.map(v => (
                <option key={v._id || v.id} value={v._id || v.id}>{v.title}</option>
              ))}
            </select>
          </div>
        )}

        <button 
          onClick={handleAdd}
          className="btn btn--primary" 
          style={{ width: '100%', padding: '0.75rem' }}
          disabled={adding}
        >
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
