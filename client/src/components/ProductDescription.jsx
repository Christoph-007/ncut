/**
 * ProductDescription — Converted from blocks/product-description.liquid
 * Renders product description as rich text.
 */
export default function ProductDescription({
  product,
  typePreset = 'rte',
  width = 'fit-content',
  alignment = 'left',
  color = 'var(--color-foreground)',
  padding = {},
}) {
  const description = product?.description || '';

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
    <div
      className={`product-description rte ${typePreset || 'paragraph'}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}
