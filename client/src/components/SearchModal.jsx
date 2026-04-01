import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

/**
 * SearchModal — ported from assets/predictive-search.js, search-modal.liquid, popover-polyfill.js
 * A global overlay that features live search queries with visual product returns.
 */
export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setLoading(true);
      // Calls the same /api endpoint standard search utilizes
      api.get(`/products?q=${encodeURIComponent(query)}&limit=5`)
        .then(res => setResults(res.data.products || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="search-modal-overlay"
      style={{
        position: 'fixed', inset: 0, zIndex: 1000, 
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <div 
        className="search-modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--color-secondary, #27272a)',
          width: '100%',
          maxWidth: '800px',
          margin: '10vh auto 0',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2>Search Products</h2>
          <button onClick={onClose} style={{ fontSize: '1.5rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input 
            ref={inputRef}
            type="search" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for something..."
            style={{
              width: '100%', padding: '1rem', fontSize: '1.25rem',
              borderRadius: '4px', border: '1px solid var(--color-border)',
              background: 'var(--color-background)', color: 'var(--color-foreground)'
            }}
          />
        </form>

        <div className="predictive-search-results" style={{ marginTop: '1rem' }}>
          {loading && <p>Loading...</p>}
          {!loading && results.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.map(prod => (
                <li key={prod._id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                  <a 
                    href={`/products/${prod._id}`} 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      navigate(`/products/${prod._id}`); 
                      onClose(); 
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'inherit', textDecoration: 'none' }}
                  >
                    {prod.images?.[0] && <img src={prod.images[0]} alt={prod.title} width="60" style={{ borderRadius: '4px' }} />}
                    <div>
                      <h4 style={{ margin: 0 }}>{prod.title}</h4>
                      <span style={{ color: 'var(--color-muted)' }}>${prod.variants?.[0]?.price?.toFixed(2)}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
          {!loading && query.trim() && results.length === 0 && (
            <p style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--color-muted)' }}>No products found for "{query}"</p>
          )}
        </div>
        <button 
          onClick={handleSubmit}
          className="btn btn--primary" 
          style={{ width: '100%', marginTop: '1rem' }}
          disabled={!query.trim()}
        >
          View all results
        </button>
      </div>
    </div>
  );
}
