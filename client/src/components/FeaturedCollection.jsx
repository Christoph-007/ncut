import { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';

/**
 * FeaturedCollection — Converted from blocks/featured-collection.liquid
 * Fetches a collection and shows its products in a grid.
 *
 * Props:
 *   collectionId  {string}  — MongoDB collection _id
 *   heading       {string}
 *   limit         {number}
 *   columns       {number}
 */
export default function FeaturedCollection({
  collectionId,
  heading = '',
  limit = 8,
  columns = 4,
}) {
  const [products, setProducts] = useState([]);
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!collectionId) return;
    setLoading(true);
    fetch(`/api/collections/${collectionId}`)
      .then((r) => r.json())
      .then((data) => {
        setCollection(data.collection ?? data);
        setProducts((data.products ?? []).slice(0, limit));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [collectionId, limit]);

  if (loading) {
    return (
      <div className="featured-collection" style={{ padding: '2rem 0' }}>
        <p style={{ opacity: 0.5 }}>Loading collection…</p>
      </div>
    );
  }

  const title = heading || collection?.title || '';

  return (
    <section className="featured-collection">
      {title && (
        <h2 className="featured-collection__heading h2" style={{ marginBottom: '1.5rem' }}>
          {title}
        </h2>
      )}
      {products.length > 0 ? (
        <div
          className="featured-collection__grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: '1rem',
          }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p style={{ opacity: 0.5 }}>No products found.</p>
      )}
    </section>
  );
}
