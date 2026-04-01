import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

/**
 * GenericPage — ported from templates/page.json
 * Generates custom static pages managed via CMS (like About Us, Terms of Service).
 */
export default function GenericPage() {
  const { handle } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // In a full implementation, you'd fetch the page by its handle or slug
    // e.g. api.get(`/pages/${handle}`)
    setLoading(true);
    
    // Simulating an API call for the static page mapping
    setTimeout(() => {
      // Mock data representing a generic page response
      const mockPages = {
        'about-us': { title: 'About Us', content: '<p>Welcome to NCUT. We construct premium dark mode aesthetics for modern digital storefronts.</p><p>Founded in 2026, our mission is styling excellence.</p>' },
        'terms-of-service': { title: 'Terms of Service', content: '<p>By using this website, you agree to our terms and conditions.</p>' }
      };

      if (mockPages[handle]) {
        setPageData(mockPages[handle]);
        setError(false);
      } else {
        setError(true);
      }
      setLoading(false);
    }, 500);
  }, [handle]);

  if (loading) return <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>Loading page...</div>;
  if (error || !pageData) return <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}><h2>Page not found</h2><p>The page "{handle}" does not exist.</p></div>;

  return (
    <div className="generic-page container" style={{ maxWidth: '800px', padding: '4rem var(--page-padding)' }}>
      <h1 style={{ marginBottom: '2.5rem', fontSize: '3rem', textAlign: 'center' }}>{pageData.title}</h1>
      
      <div 
        className="page-content rte"
        style={{
          fontSize: '1.125rem',
          lineHeight: '1.8',
          color: 'var(--color-muted)'
        }}
        // In a real app, ensure content is sanitized before dangerously setting it!
        dangerouslySetInnerHTML={{ __html: pageData.content }}
      />
    </div>
  );
}
