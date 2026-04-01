/**
 * ProductCustomProperty — Converted from blocks/product-custom-property.liquid
 * A custom input (text or checkbox) added to the product form as a line item property.
 *
 * Props:
 *   label       {string}
 *   type        {string}  — 'text' | 'checkbox'
 *   placeholder {string}
 *   required    {boolean}
 *   value       {string|boolean}
 *   onChange    {function}
 */
export default function ProductCustomProperty({
  label = '',
  type = 'text',
  placeholder = '',
  required = false,
  value = '',
  onChange,
}) {
  if (type === 'checkbox') {
    return (
      <label
        className="product-custom-property product-custom-property--checkbox"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
      >
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange?.(e.target.checked)}
          required={required}
        />
        <span>{label}{required && <span aria-hidden="true"> *</span>}</span>
      </label>
    );
  }

  return (
    <div className="product-custom-property product-custom-property--text">
      {label && (
        <label
          style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}
          htmlFor={`custom-prop-${label}`}
        >
          {label}{required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <input
        id={`custom-prop-${label}`}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="contact-form__input"
        style={{ width: '100%' }}
      />
    </div>
  );
}
