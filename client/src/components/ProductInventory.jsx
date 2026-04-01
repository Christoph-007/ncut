/**
 * ProductInventory — Converted from blocks/product-inventory.liquid
 * Shows inventory status: in stock, low stock, or out of stock.
 */
export default function ProductInventory({
  selectedVariant,
  inventoryThreshold = 10,
  showInventoryQuantity = true,
  padding = {},
}) {
  const inventory = selectedVariant?.inventory ?? null;
  const inventoryPolicy = selectedVariant?.inventoryPolicy ?? 'deny';

  let status = 'in_stock';
  let text = 'In stock';

  if (inventory !== null) {
    if (inventory > 0) {
      if (inventory <= inventoryThreshold) {
        status = 'low';
        text = showInventoryQuantity ? `Only ${inventory} left` : 'Low stock';
      } else {
        status = 'in_stock';
        text = 'In stock';
      }
    } else {
      if (inventoryPolicy === 'continue') {
        status = 'in_stock';
        text = 'In stock';
      } else {
        status = 'out_of_stock';
        text = 'Out of stock';
      }
    }
  }

  const statusColors = {
    in_stock: 'var(--color-instock, #22c55e)',
    low: 'var(--color-lowstock, #f59e0b)',
    out_of_stock: 'var(--color-outofstock, #ef4444)',
  };

  const style = {
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  return (
    <div className="product-inventory" style={style}>
      <span className="product-inventory__status" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <span
          className={`product-inventory__icon product-inventory__icon-${status}`}
          style={{
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '50%',
            backgroundColor: statusColors[status],
            display: 'inline-block',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
        <span className="product-inventory__text" role="status">
          {text}
        </span>
      </span>
    </div>
  );
}
