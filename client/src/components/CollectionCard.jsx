import { Link } from 'react-router-dom';

/**
 * CollectionCard — Converted from blocks/collection-card.liquid
 * Collection preview card with image and title.
 *
 * Props:
 *   collection          {object}  — MongoDB collection document
 *   placement           {string}  — 'on_image' | 'below_image'
 *   horizontalAlignment {string}  — 'flex-start' | 'center' | 'flex-end'
 *   verticalAlignment   {string}  — 'flex-start' | 'center' | 'flex-end'
 *   gap                 {number}
 *   border              {string}
 *   borderRadius        {number}
 *   children            {ReactNode} — optional extra blocks
 */
export default function CollectionCard({
  collection,
  placement = 'below_image',
  horizontalAlignment = 'flex-start',
  verticalAlignment = 'center',
  gap = 8,
  border = 'none',
  borderWidth = 1,
  borderRadius = 0,
  children,
}) {
  if (!collection) return null;

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: `${gap}px`,
    border: border !== 'none' ? `${borderWidth}px solid var(--color-border, #e2e8f0)` : undefined,
    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    position: 'relative',
  };

  const imgStyle = {
    width: '100%',
    aspectRatio: '4 / 3',
    objectFit: 'cover',
    display: 'block',
    background: 'var(--color-placeholder, #f1f5f9)',
  };

  const onImageOverlay = placement === 'on_image' && {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: horizontalAlignment,
    alignItems: verticalAlignment,
    padding: '1rem',
    background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
    color: '#fff',
  };

  return (
    <Link to={`/collections/${collection._id}`} style={cardStyle} className="collection-card">
      <div style={{ position: 'relative' }}>
        {collection.image ? (
          <img
            src={collection.image}
            alt={collection.title}
            style={imgStyle}
            className="collection-card__image"
            loading="lazy"
          />
        ) : (
          <div style={imgStyle} className="collection-card__image--placeholder" />
        )}
        {placement === 'on_image' && (
          <div style={onImageOverlay} className="collection-card__overlay">
            <span className="collection-card__title h4">{collection.title}</span>
            {children}
          </div>
        )}
      </div>
      {placement === 'below_image' && (
        <div
          className="collection-card__info"
          style={{ padding: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: `${gap}px` }}
        >
          <span className="collection-card__title h4">{collection.title}</span>
          {children}
        </div>
      )}
    </Link>
  );
}
