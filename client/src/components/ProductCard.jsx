import { Link } from 'react-router-dom';
import Price from './Price';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/I18nContext';

/**
 * ProductCard — ported from snippets/product-card.liquid
 * Complex grid tile handling primary/hover images, badges, price, and hovering quick-add.
 */
export default function ProductCard({ 
  product, 
  showQuickAdd = true,
  mediaAspect = "4/5" 
}) {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  
  if (!product) return null;

  const firstVariant = product.variants?.[0] || {};
  const isAvailable = firstVariant && firstVariant.price !== undefined;
  
  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (isAvailable) {
      addToCart(product, firstVariant, 1);
    }
  };

  const hasHoverImage = product.images && product.images.length > 1;

  return (
    <Link 
      to={`/products/${product._id || product.id}`} 
      className="product-card-link group"
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <div 
        className="product-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative',
          backgroundColor: 'transparent'
        }}
      >
        {/* Media Wrapper */}
        <div 
          className="product-card__media"
          style={{
            position: 'relative',
            aspectRatio: mediaAspect,
            overflow: 'hidden',
            borderRadius: 'var(--border-radius-base, 8px)',
            backgroundColor: 'var(--color-secondary)'
          }}
        >
          {/* Badges */}
          {firstVariant.compare_at_price > firstVariant.price && (
            <span 
              className="badge badge--sale"
              style={{
                position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 10,
                backgroundColor: 'var(--color-foreground)', color: 'var(--color-background)',
                padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', borderRadius: '4px'
              }}
            >
              {t('content.product_badge_sale')}
            </span>
          )}

          {/* Primary Image */}
          <img 
            src={product.images?.[0] || '/placeholder.jpg'} 
            alt={product.title}
            className="product-card__image-primary"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              transition: 'opacity 0.3s ease, transform 0.8s ease'
            }}
          />
          
          {/* Hover Image */}
          {hasHoverImage && (
            <img 
              src={product.images[1]} 
              alt={`${product.title} alternative view`}
              className="product-card__image-secondary"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0, transition: 'opacity 0.3s ease, transform 0.8s ease'
              }}
            />
          )}

          {/* Quick Add Button Layout Panel Style */}
          {showQuickAdd && isAvailable && (
            <div 
              className="product-card__quick-add"
              style={{
                position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem',
                opacity: 0, transform: 'translateY(10px)', transition: 'all 0.3s ease', zIndex: 20
              }}
            >
              <button
                onClick={handleQuickAdd}
                className="btn btn--primary"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.875rem', backgroundColor: 'rgba(255,255,255,0.9)', color: 'black', backdropFilter: 'blur(4px)' }}
              >
                + Quick Add
              </button>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="product-card__content" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '500', lineHeight: 1.3 }}>{product.title}</h3>
          <Price 
            price={firstVariant.price} 
            compareAtPrice={firstVariant.compare_at_price} 
          />
        </div>
      </div>

      <style>{`
        .product-card-link:hover .product-card__image-primary { ${hasHoverImage ? 'opacity: 0;' : 'transform: scale(1.03);'} }
        .product-card-link:hover .product-card__image-secondary { opacity: 1; transform: scale(1.03); }
        .product-card-link:hover .product-card__quick-add { opacity: 1; transform: translateY(0); }
      `}</style>
    </Link>
  );
}
