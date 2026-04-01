import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api';

/**
 * FeaturedProduct — ported from sections/featured-product.liquid
 * Isolated Hero product viewer that allows adding directly to cart from a homepage context.
 */
export default function FeaturedProduct({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    
    api.get(`/products/${productId}`)
      .then(res => setProduct(res.data.product || res.data))
      .catch(err => console.error("Error loading featured product", err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return null;
  // If no specific product is found or assigned, render placeholder state (like Shopify theme editor)
  const displayProduct = product || {
    title: "Example Featured Product",
    variants: [{ price: 99.99, title: "Default Title" }],
    description: "<p>A beautiful example product demonstrating the featured product section.</p>",
    images: ["/placeholder.jpg"]
  };

  const currentVariant = displayProduct.variants?.[0];

  const handleAddToCart = () => {
    if (product) addToCart(product, currentVariant, 1);
    else alert("Placeholder cannot be added to cart!");
  };

  return (
    <section className="featured-product" style={{ padding: 'var(--spacing-3xl) 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        
        {/* Media Block */}
        <div className="product-media" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <img 
            src={displayProduct.images[0]} 
            alt={displayProduct.title} 
            style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '4/5', objectFit: 'cover' }}
          />
        </div>

        {/* Content Block */}
        <div className="product-info" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem 0' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', color: 'var(--color-muted)' }}>Featured</span>
          <h2 style={{ fontSize: '3rem', margin: 0, lineHeight: 1.1 }}>{displayProduct.title}</h2>
          
          <div className="price-container" style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
            ${currentVariant?.price?.toFixed(2)}
          </div>
          
          {displayProduct.description && (
            <div 
              className="featured-description rte"
              style={{ color: 'var(--color-muted)', lineHeight: '1.7', fontSize: '1.125rem' }}
              dangerouslySetInnerHTML={{ __html: displayProduct.description }}
            />
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              onClick={handleAddToCart}
              className="btn btn--primary"
              style={{ padding: '1rem 3rem', fontSize: '1.125rem', width: 'auto' }}
            >
              Add to Cart
            </button>
            {product && (
              <a 
                href={`/products/${product._id}`}
                className="btn btn--outline"
                style={{ padding: '1rem 2rem', fontSize: '1.125rem', border: '1px solid var(--color-border)', color: 'white', textDecoration: 'none', borderRadius: 'var(--border-radius-base)' }}
              >
                View Details
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
