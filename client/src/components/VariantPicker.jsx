import { useState, useEffect } from 'react';

/**
 * VariantPicker — Converted from blocks/variant-picker.liquid
 * Renders product option selectors (dropdowns or buttons) to select a variant.
 *
 * Props:
 *   product         {object}   — product with options[] and variants[]
 *   selectedVariant {object}   — currently selected variant
 *   onVariantChange {function} — callback(variant) when selection changes
 *   variantStyle    {string}   — 'dropdowns' | 'buttons'
 *   showSwatches    {boolean}
 *   alignment       {string}
 *   padding         {object}
 */
export default function VariantPicker({
  product,
  selectedVariant,
  onVariantChange,
  variantStyle = 'buttons',
  showSwatches = true,
  alignment = 'left',
  padding = {},
}) {
  const [selectedOptions, setSelectedOptions] = useState({});

  // Initialize from selectedVariant
  useEffect(() => {
    if (selectedVariant?.options) {
      setSelectedOptions(selectedVariant.options);
    } else if (product?.options?.length) {
      const initial = {};
      product.options.forEach((opt) => {
        initial[opt.name] = opt.values[0];
      });
      setSelectedOptions(initial);
    }
  }, [selectedVariant, product]);

  if (!product?.options?.length || (product.options.length === 1 && product.options[0].name === 'Title')) {
    return null;
  }

  function handleOptionChange(optionName, value) {
    const updated = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(updated);

    // Find matching variant
    const match = product.variants?.find((v) =>
      Object.entries(updated).every(([k, val]) => v.options?.[k] === val)
    );
    if (match && onVariantChange) onVariantChange(match);
  }

  const style = {
    textAlign: alignment,
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  return (
    <div className="variant-picker" style={style}>
      {product.options.map((option) => (
        <div key={option.name} className="variant-picker__option">
          <label className="variant-picker__label">
            {option.name}
            {selectedOptions[option.name] && (
              <span className="variant-picker__selected"> — {selectedOptions[option.name]}</span>
            )}
          </label>

          {variantStyle === 'dropdowns' ? (
            <select
              className="variant-picker__select"
              value={selectedOptions[option.name] || ''}
              onChange={(e) => handleOptionChange(option.name, e.target.value)}
            >
              {option.values.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          ) : (
            <div className="variant-picker__buttons" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {option.values.map((val) => {
                const isSelected = selectedOptions[option.name] === val;
                return (
                  <button
                    key={val}
                    type="button"
                    className={`variant-picker__button ${isSelected ? 'variant-picker__button--selected' : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => handleOptionChange(option.name, val)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      border: '1px solid var(--color-border, #ccc)',
                      borderColor: isSelected ? 'var(--color-primary, #000)' : undefined,
                      fontWeight: isSelected ? '600' : undefined,
                      cursor: 'pointer',
                      background: 'transparent',
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
