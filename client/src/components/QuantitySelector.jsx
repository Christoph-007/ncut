/**
 * QuantitySelector — Converted from blocks/quantity.liquid
 * Numeric quantity input with increment/decrement buttons.
 *
 * Props:
 *   quantity    {number}   — current quantity value
 *   onChange    {function} — callback(newQty)
 *   min         {number}
 *   max         {number}
 *   step        {number}
 */
export default function QuantitySelector({ quantity = 1, onChange, min = 1, max = null, step = 1 }) {
  function decrement() {
    const next = quantity - step;
    if (next >= min) onChange?.(next);
  }

  function increment() {
    const next = quantity + step;
    if (max === null || next <= max) onChange?.(next);
  }

  function handleInput(e) {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= min && (max === null || val <= max)) {
      onChange?.(val);
    }
  }

  return (
    <div className="quantity-selector" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <button
        type="button"
        className="quantity-selector__btn quantity-selector__btn--minus"
        onClick={decrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        style={{
          width: '2.25rem',
          height: '2.25rem',
          border: '1px solid var(--color-border, #ccc)',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: '1.25rem',
        }}
      >
        −
      </button>
      <input
        type="number"
        className="quantity-selector__input"
        value={quantity}
        min={min}
        max={max ?? undefined}
        step={step}
        onChange={handleInput}
        style={{
          width: '3.5rem',
          textAlign: 'center',
          border: '1px solid var(--color-border, #ccc)',
          padding: '0.375rem',
          MozAppearance: 'textfield',
        }}
      />
      <button
        type="button"
        className="quantity-selector__btn quantity-selector__btn--plus"
        onClick={increment}
        disabled={max !== null && quantity >= max}
        aria-label="Increase quantity"
        style={{
          width: '2.25rem',
          height: '2.25rem',
          border: '1px solid var(--color-border, #ccc)',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: '1.25rem',
        }}
      >
        +
      </button>
    </div>
  );
}
