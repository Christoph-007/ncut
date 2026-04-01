import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

/**
 * CollectionListSection — ported from sections/collection-list.liquid
 * Section rendering out a variable grid of collections for the homepage.
 */
export default function CollectionListSection({ 
  limit = 4, 
  heading = "Shop by Category",
  columns = 4
}) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/collections?limit=${limit}`)
      .then(res => setCollections(res.data.collections || res.data || []))
      .catch(err => console.error("Error loading CollectionListSection", err))
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading || collections.length === 0) return null;

  return (
    <section className="collection-list-section" style={{ padding: '4rem 0' }}>
      <div className="container">
        {heading && <h2 style={{ marginBottom: '2.5rem', fontSize: '2.5rem' }}>{heading}</h2>}
        
        <div 
          className="collections-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(calc(100% / ${columns} - 2rem), 1fr))`,
            gap: '1.5rem'
          }}
        >
          {collections.slice(0, limit).map(coll => (
            <Link 
              key={coll._id || coll.id}
              to={`/collections/${coll._id || coll.id}`}
              className="collection-card"
              style={{
                position: 'relative',
                display: 'block',
                borderRadius: '8px',
                overflow: 'hidden',
                aspectRatio: '1/1',
                backgroundColor: 'var(--color-secondary)'
              }}
            >
              <img 
                src={coll.image || coll.images?.[0] || '/placeholder.jpg'} 
                alt={coll.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              />
              <div 
                className="collection-card-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem'
                }}
              >
                <h3 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {coll.title} <span>→</span>
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <style>{`
        .collection-card:hover img { transform: scale(1.05); }
      `}</style>
    </section>
  );
}
