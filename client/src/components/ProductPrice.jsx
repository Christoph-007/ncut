/**
 * ProductPrice — Converted from blocks/price.liquid
 * Displays product price with sale price, tax info options.
 *
 * Props:
 *   product       {object} — MongoDB product with variants
 *   selectedVariant {object} — currently selected variant
 *   showSalePriceFirst {boolean}
 *   showTaxInfo   {boolean}
 *   typePreset    {string}
 *   alignment     {string}
 *   padding       {object}
 */
export default function ProductPrice({
  product,
  selectedVariant,
  showSalePriceFirst = true,
  showTaxInfo = false,
  typePreset = 'h6',
  alignment = 'left',
  padding = {},
}) {
  const variant = selectedVariant || product?.variants?.[0];
  if (!variant) return null;

  const price = variant.price ?? 0;
  const compareAtPrice = variant.compareAtPrice ?? null;
  const isOnSale = compareAtPrice && compareAtPrice > price;

  const formatMoney = (cents) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

  const style = {
    textAlign: alignment,
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  return (
    <div className={`product-price ${typePreset || 'paragraph'}`} style={style}>
      {isOnSale && showSalePriceFirst && (
        <span className="product-price__sale">{formatMoney(price)}</span>
      )}
      {isOnSale ? (
        <s className="product-price__compare">{formatMoney(compareAtPrice)}</s>
      ) : (
        <span className="product-price__regular">{formatMoney(price)}</span>
      )}
      {isOnSale && !showSalePriceFirst && (
        <span className="product-price__sale">{formatMoney(price)}</span>
      )}
      {showTaxInfo && (
        <div className="tax-note" style={{ fontSize: '0.875em', opacity: 0.7 }}>
          Price includes applicable taxes
        </div>
      )}
    </div>
  );
}
