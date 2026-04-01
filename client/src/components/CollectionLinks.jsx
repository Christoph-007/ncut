import { Link } from 'react-router-dom';

/**
 * CollectionLinks — ported from sections/collection-links.liquid
 * Semantic navigation linking block routing users directly to isolated product categories.
 */
export default function CollectionLinks({ 
  links = [
    { title: "New Arrivals", url: "/collections/new" },
    { title: "Best Sellers", url: "/collections/best-sellers" },
    { title: "Accessories", url: "/collections/accessories" },
    { title: "Sale", url: "/collections/sale" }
  ],
  heading = "Quick Links"
}) {
  return (
    <div className="collection-links-block" style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-secondary)', margin: '2rem 0', borderRadius: '8px' }}>
      {heading && <h3 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', margin: 0 }}>{heading}</h3>}
      
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', listStyle: 'none', padding: 0, margin: 0, justifyContent: 'center' }}>
        {links.map((link, i) => (
          <li key={i}>
            <Link 
              to={link.url}
              style={{
                color: 'var(--color-foreground)',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.125rem',
                borderBottom: '2px solid transparent',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'var(--color-foreground)'}
              onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
