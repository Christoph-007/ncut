import { useEffect, useState } from 'react';

/**
 * useRecentlyViewed — ported from assets/recently-viewed-products.js
 * Manages an array of viewed product IDs in localStorage.
 */
export default function useRecentlyViewed(productId = null) {
  const [viewedProducts, setViewedProducts] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ncut_recently_viewed');
      let parsed = stored ? JSON.parse(stored) : [];

      if (productId) {
        // Remove if it's already there to move it to the front
        parsed = parsed.filter(id => id !== productId);
        // Add to front
        parsed.unshift(productId);
        // Limit to 10 products
        parsed = parsed.slice(0, 10);
        localStorage.setItem('ncut_recently_viewed', JSON.stringify(parsed));
      }
      setViewedProducts(parsed);
    } catch (e) {
      console.warn('Could not access localStorage for recently viewed products', e);
    }
  }, [productId]);

  return viewedProducts;
}
