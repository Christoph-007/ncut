import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

/**
 * ListCollectionsPage — ported from templates/list-collections.json
 * Generates an index directory showing all available store categories.
 */
export default function ListCollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Attempt to fetch all collections from the backend
    api.get('/collections')
      .then(res => {
        setCollections(res.data.collections || res.data || []);
      })
      .catch(err => {
        console.error('Error fetching collections list:', err);
        setError('Failed to load collections.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading collections...</div>;
  if (error) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center', color: '#ef4444' }}>{error}</div>;

  return (
    <div className="list-collections-page container" style={{ padding: 'var(--spacing-2xl) 0' }}>
      <h1 style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center', fontSize: '3rem' }}>All Collections</h1>
      
      {collections.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-muted)' }}>No collections found.</p>
      ) : (
        <div 
          className="collections-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--spacing-xl)'
          }}
        >
          {collections.map(collection => (
            <Link 
              key={collection._id || collection.id} 
              to={`/collections/${collection._id || collection.id}`}
              className="collection-card"
              style={{
                display: 'block',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--border-radius-md)',
                backgroundColor: 'var(--color-secondary)'
              }}
            >
              <div 
                className="collection-image-wrapper"
                style={{ aspectRatio: '1/1', width: '100%', backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                {(collection.image || collection.images?.[0]) ? (
                  <img 
                    src={collection.image || collection.images?.[0]} 
                    alt={collection.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-muted)' }}>
                    No Image
                  </div>
                )}
              </div>
              
              <div 
                className="collection-info"
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  color: 'white'
                }}
              >
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>
                  {collection.title} 
                  <span style={{ display: 'inline-block', marginLeft: '0.5rem', transition: 'transform 0.2s', fontSize: '1.25rem' }}>→</span>
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
