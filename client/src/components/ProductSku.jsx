/**
 * ProductSku — Converted from blocks/sku.liquid
 * Displays the selected variant's SKU.
 */
export default function ProductSku({
  selectedVariant,
  typePreset = 'paragraph',
  alignment = 'left',
  padding = {},
}) {
  const sku = selectedVariant?.sku;
  if (!sku) return null;

  const style = {
    textAlign: alignment,
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  return (
    <div className={`product-sku ${typePreset || 'paragraph'}`} style={style}>
      <span className="product-sku__label">SKU: </span>
      <span className="product-sku__value">{sku}</span>
    </div>
  );
}
