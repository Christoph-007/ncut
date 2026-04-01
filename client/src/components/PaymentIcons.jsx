/**
 * PaymentIcons — Converted from blocks/payment-icons.liquid
 * Shows accepted payment method icons.
 *
 * Props:
 *   methods {string[]} — list of accepted payment methods
 */

const PAYMENT_ICONS = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  paypal: 'PayPal',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
  shopify_pay: 'Shop Pay',
};

export default function PaymentIcons({
  methods = ['visa', 'mastercard', 'amex', 'paypal'],
}) {
  return (
    <div
      className="payment-icons"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}
      aria-label="Accepted payment methods"
    >
      {methods.map((method) => (
        <span
          key={method}
          className={`payment-icon payment-icon--${method}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.25rem 0.5rem',
            border: '1px solid var(--color-border, #e2e8f0)',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: '#fff',
            color: '#333',
            minWidth: '2.5rem',
          }}
          aria-label={PAYMENT_ICONS[method] || method}
        >
          {PAYMENT_ICONS[method] || method}
        </span>
      ))}
    </div>
  );
}
