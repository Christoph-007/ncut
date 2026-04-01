import { Link } from 'react-router-dom';

/**
 * ProductTitle — Converted from blocks/product-title.liquid
 * Displays the product title as a linked heading.
 */
export default function ProductTitle({
  product,
  typePreset = 'rte',
  width = 'fit-content',
  alignment = 'left',
  color = 'var(--color-foreground)',
  padding = {},
}) {
  if (!product) {
    return (
      <p role="heading" aria-level={3} className={`product-title ${typePreset || 'paragraph'}`}>
        Product Title
      </p>
    );
  }

  const style = {
    color,
    width,
    textAlign: width === '100%' ? alignment : undefined,
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="product-title-link"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <p
        role="heading"
        aria-level={3}
        className={`product-title ${typePreset || 'paragraph'}`}
        style={style}
      >
        {product.title}
      </p>
    </Link>
  );
}
