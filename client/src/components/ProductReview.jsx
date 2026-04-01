/**
 * ProductReview — Converted from blocks/review.liquid
 * Displays a product review with star rating, author, and body.
 *
 * Props:
 *   reviews    {Array<{author, rating, body, date}>}
 *   showCount  {boolean}
 *   padding    {object}
 */
function Stars({ rating = 0 }) {
  return (
    <span className="product-review__stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ color: star <= rating ? 'var(--color-primary, #f59e0b)' : 'var(--color-border, #d1d5db)' }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function ProductReview({ reviews = [], showCount = true, padding = {} }) {
  if (!reviews.length) return null;

  const avgRating = reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / reviews.length;

  const style = {
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  return (
    <div className="product-reviews" style={style}>
      {showCount && (
        <div className="product-reviews__summary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Stars rating={Math.round(avgRating)} />
          <span className="product-reviews__count" style={{ fontSize: '0.875rem', opacity: 0.7 }}>
            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
      <div className="product-reviews__list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {reviews.map((review, i) => (
          <article key={i} className="product-review">
            <Stars rating={review.rating} />
            {review.author && (
              <p className="product-review__author" style={{ fontWeight: 600, margin: '0.25rem 0 0' }}>
                {review.author}
                {review.date && (
                  <time style={{ fontWeight: 400, opacity: 0.6, marginLeft: '0.5rem', fontSize: '0.875rem' }}>
                    {new Date(review.date).toLocaleDateString()}
                  </time>
                )}
              </p>
            )}
            {review.body && (
              <p className="product-review__body" style={{ margin: '0.5rem 0 0', lineHeight: 1.6 }}>
                {review.body}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
