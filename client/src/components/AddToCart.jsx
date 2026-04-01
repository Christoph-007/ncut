import { useCart } from '../context/CartContext.jsx';

/**
 * AddToCart — Converted from blocks/add-to-cart.liquid
 * Add to cart button. Reads cart context and dispatches ADD action.
 *
 * Props:
 *   product         {object}  — MongoDB product document
 *   selectedVariant {object}  — currently selected variant
 *   quantity        {number}  — quantity to add
 *   canAddToCart    {boolean} — whether the product is available
 *   addToCartText   {string}  — button label override
 *   styleClass      {string}  — 'button' | 'button-secondary'
 */
export default function AddToCart({
  product,
  selectedVariant,
  quantity = 1,
  canAddToCart = true,
  addToCartText,
  styleClass = 'button-secondary',
}) {
  const { addToCart } = useCart();

  const variant = selectedVariant || product?.variants?.[0];
  const isAvailable = canAddToCart && variant && (variant.inventory == null || variant.inventory > 0);

  let label = addToCartText;
  if (!label) {
    if (!isAvailable) {
      label = variant?.inventory === 0 ? 'Sold out' : 'Unavailable';
    } else {
      label = 'Add to cart';
    }
  }

  function handleClick() {
    if (!isAvailable || !product || !variant) return;
    addToCart({ product, variant, quantity });
  }

  return (
    <button
      type="button"
      className={`add-to-cart-button ${styleClass}`}
      disabled={!isAvailable}
      onClick={handleClick}
      data-testid="standalone-add-to-cart"
      style={{ cursor: isAvailable ? 'pointer' : 'not-allowed' }}
    >
      {label}
    </button>
  );
}
