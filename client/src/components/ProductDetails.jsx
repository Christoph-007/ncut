/**
 * ProductDetails — ported from blocks/_product-details.liquid
 * The structural Sidebar constraint responsible for "Sticky" behavior of buy buttons/forms 
 * alongside product galleries on the PDP.
 */
export default function ProductDetails({ 
  children, 
  isSticky = true,
  position = "flex-start", // 'flex-start' | 'center' | 'flex-end'
  maxWidth = "100%"
}) {
  return (
    <div 
      className={`product-details-wrapper ${isSticky ? 'sticky-desktop' : ''}`}
      style={{
        width: '100%',
        maxWidth: maxWidth,
        display: 'flex',
        alignSelf: position,
        justifyContent: position === 'center' ? 'center' : 'flex-start',
        // Sticky mechanics mimicking the Liquid setup
        position: isSticky ? 'sticky' : 'relative',
        top: isSticky ? 'calc(var(--header-height, 80px) + 2rem)' : 'auto',
        height: 'min-content'
      }}
    >
      <div 
        className="product-details-content"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          width: '100%' 
        }}
      >
        {children}
      </div>

      <style>{`
        /* Disable sticky behavior on mobile where elements stack */
        @media screen and (max-width: 989px) {
          .product-details-wrapper.sticky-desktop {
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
