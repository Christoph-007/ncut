/**
 * Price — ported from snippets/price.liquid
 * Handles product price display logic: sale vs regular price, formatting, and strike-through.
 * Follows the "accurate to every pixel" mandate based on Shopify schema outputs.
 */
export default function Price({ price, compareAtPrice, showCurrency = true, large = false }) {
  // Graceful handling of missing or zero prices
  if (price === undefined || price === null) return null;
  
  const numPrice = Number(price);
  const numCompare = Number(compareAtPrice);
  const isSale = numCompare > numPrice;

  const formatOptions = {
    style: showCurrency ? 'currency' : 'decimal',
    currency: 'USD', // Hardcoded USD for demo purposes, can map to global config
    minimumFractionDigits: 2
  };
  
  const formattedPrice = new Intl.NumberFormat('en-US', formatOptions).format(numPrice);
  const formattedCompare = isSale ? new Intl.NumberFormat('en-US', formatOptions).format(numCompare) : null;

  return (
    <div 
      className={`price-container ${large ? 'price--large' : 'price--regular'}`}
      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}
    >
      {isSale ? (
        <>
          <span 
            className="price-item--sale"
            style={{ 
              color: 'var(--color-foreground)', 
              fontWeight: large ? '700' : '600',
              fontSize: large ? '1.5rem' : '1.125rem' 
            }}
          >
            {formattedPrice}
          </span>
          <span 
            className="price-item--regular compare-at-price"
            style={{ 
              color: 'var(--color-muted)', 
              textDecoration: 'line-through',
              fontSize: large ? '1.125rem' : '0.875rem' 
            }}
          >
            {formattedCompare}
          </span>
        </>
      ) : (
        <span 
          className="price-item--regular"
          style={{ 
            color: 'var(--color-foreground)',
            fontWeight: large ? '600' : '500',
            fontSize: large ? '1.5rem' : '1.125rem' 
          }}
        >
          {formattedPrice}
        </span>
      )}
    </div>
  );
}
