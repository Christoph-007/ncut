import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

/**
 * FeaturedBlogPosts — ported from sections/featured-blog-posts.liquid
 * Displays recent articles matching a specified blog or generally the latest published.
 */
export default function FeaturedBlogPosts({ limit = 3, heading = "Latest News", layout = "grid" }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest articles (stubbed limit parameter sent to express router)
    api.get(`/blog?limit=${limit}`)
      .then(res => setPosts(res.data || res.data.articles || []))
      .catch(err => console.error("Could not fetch blog posts", err))
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading || posts.length === 0) return null;

  return (
    <section className="featured-blog-posts color-scheme-1" style={{ padding: 'var(--spacing-3xl) 0', backgroundColor: 'var(--color-background)' }}>
      <div className="container">
        {heading && (
          <div className="section-header" style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'var(--font-heading--size-lg)', fontFamily: 'var(--font-heading--family)', margin: 0 }}>
              {heading}
            </h2>
          </div>
        )}

        <div 
          className="articles-list"
          style={{
            display: layout === 'grid' ? 'grid' : 'flex',
            gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fit, minmax(320px, 1fr))' : 'none',
            flexDirection: layout === 'carousel' ? 'row' : 'column',
            gap: 'var(--spacing-xl)',
            overflowX: layout === 'carousel' ? 'auto' : 'visible'
          }}
        >
          {posts.map(post => (
            <article 
              key={post._id} 
              className="article-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                minWidth: layout === 'carousel' ? '300px' : 'auto',
                backgroundColor: 'var(--color-secondary)',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease'
              }}
            >
              <Link to={`/blog/${post.slug}`} style={{ display: 'block', overflow: 'hidden', aspectRatio: '16/9' }}>
                <img 
                  src={post.image || '/placeholder-blog.jpg'} 
                  alt={post.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Link>
              
              <div className="article-content" style={{ padding: '1.5rem' }}>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  {new Date(post.publishedAt || Date.now()).toLocaleDateString()}
                </p>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', margin: 0 }}>
                  <Link to={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt && (
                  <p style={{ color: 'var(--color-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {post.excerpt.slice(0, 100)}...
                  </p>
                )}
                <Link 
                  to={`/blog/${post.slug}`}
                  style={{ fontWeight: 'bold', color: 'var(--color-foreground)', textDecoration: 'underline' }}
                >
                  Read Article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
