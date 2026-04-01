/**
 * Pagination — ported from snippets/pagination-controls.liquid
 * Renders standardized button arrays to traverse datasets.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav 
      className="pagination" 
      aria-label="Pagination Navigation"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '3rem'
      }}
    >
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          padding: '0.5rem 1rem', border: '1px solid var(--color-border)', borderRadius: '4px',
          backgroundColor: 'transparent', color: 'var(--color-foreground)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1
        }}
        aria-label="Previous Page"
      >
        ←
      </button>

      {/* Page Numbers */}
      <ul style={{ display: 'flex', gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {pages.map(page => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              style={{
                width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%', border: 'none', cursor: 'pointer', fontWeight: '500',
                backgroundColor: page === currentPage ? 'var(--color-foreground)' : 'transparent',
                color: page === currentPage ? 'var(--color-background)' : 'var(--color-foreground)',
                transition: 'all 0.2s ease'
              }}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          padding: '0.5rem 1rem', border: '1px solid var(--color-border)', borderRadius: '4px',
          backgroundColor: 'transparent', color: 'var(--color-foreground)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.5 : 1
        }}
        aria-label="Next Page"
      >
        →
      </button>
    </nav>
  );
}
