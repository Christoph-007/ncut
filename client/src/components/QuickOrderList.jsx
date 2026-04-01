import { useState } from 'react';
import QuantitySelector from './QuantitySelector';
import { useCart } from '../context/CartContext';

/**
 * QuickOrderList — ported from sections/quick-order-list.liquid
 * A table allowing B2B or power users to add bulk variants to their cart instantly.
 */
export default function QuickOrderList({ product }) {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  if (!product || !product.variants || product.variants.length === 0) return null;

  const handleBulkAdd = () => {
    // Collect all variants that have a quantity > 0
    const toAdd = Object.keys(quantities).map(variantId => {
      const qty = quantities[variantId];
      if (qty > 0) {
        const variant = product.variants.find(v => (v._id || v.id).toString() === variantId);
        return { variant, qty };
      }
      return null;
    }).filter(item => item !== null);

    // In a real implementation with bulk add endpoints, you would fire a single API call here
    // For now, we simulate looping over the cart additions.
    toAdd.forEach(item => {
      addToCart(product, item.variant, item.qty);
    });

    // Reset quantities after bulk add
    setQuantities({});
  };

  const totalItems = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);

  return (
    <div className="quick-order-list container" style={{ padding: '2rem 0' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Full Variant List</h3>
      
      <div 
        className="quick-order-table"
        style={{
          width: '100%',
          overflowX: 'auto',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          backgroundColor: 'var(--color-background)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-secondary)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem', fontWeight: 'bold' }}>Variant</th>
              <th style={{ padding: '1rem', fontWeight: 'bold' }}>Price</th>
              <th style={{ padding: '1rem', fontWeight: 'bold' }}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {product.variants.map((v) => {
              const vId = (v._id || v.id).toString();
              return (
                <tr key={vId} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem' }}>{v.title}</td>
                  <td style={{ padding: '1rem', color: 'var(--color-muted)' }}>${v.price?.toFixed(2)}</td>
                  <td style={{ padding: '1rem', width: '200px' }}>
                    <QuantitySelector 
                      quantity={quantities[vId] || 0}
                      onChange={(newQty) => setQuantities({ ...quantities, [vId]: newQty })}
                      min={0}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && (
        <div 
          className="quick-order-actions"
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <span style={{ color: 'var(--color-muted)' }}>
            Adding {totalItems} item{totalItems !== 1 ? 's' : ''} to cart
          </span>
          <button 
            onClick={handleBulkAdd}
            className="btn btn--primary"
            style={{ padding: '0.75rem 2rem' }}
          >
            Bulk Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}
