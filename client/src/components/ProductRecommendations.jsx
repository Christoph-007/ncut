import { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';

/**
 * ProductRecommendations — Converted from blocks/product-recommendations.liquid
 * Fetches and displays recommended products from the API.
 *
 * Props:
 *   productId   {string}  — current product's MongoDB _id
 *   limit       {number}  — max number of recommendations
 *   heading     {string}
 */
export default function ProductRecommendations({ productId, limit = 4, heading = 'You may also like' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetch(`/api/products?limit=${limit}&exclude=${productId}`)
      .then((r) => r.json())
      .then((data) => setProducts(data.products ?? data ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [productId, limit]);

  if (loading) {
    return (
      <div className="product-recommendations" style={{ padding: '1rem 0' }}>
        <p style={{ opacity: 0.5 }}>Loading recommendations…</p>
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <section className="product-recommendations">
      {heading && <h2 className="product-recommendations__heading h3" style={{ marginBottom: '1rem' }}>{heading}</h2>}
      <div
        className="product-recommendations__grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
