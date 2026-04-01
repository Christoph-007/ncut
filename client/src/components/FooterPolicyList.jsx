import { Link } from 'react-router-dom';

/**
 * FooterPolicyList — Converted from blocks/footer-policy-list.liquid
 * A list of store policy links (privacy, returns, shipping, etc.).
 *
 * Props:
 *   policies {Array<{title, href}>}
 */
export default function FooterPolicyList({ policies = [] }) {
  const defaults = [
    { title: 'Privacy Policy', href: '/policies/privacy-policy' },
    { title: 'Terms of Service', href: '/policies/terms-of-service' },
    { title: 'Return Policy', href: '/policies/return-policy' },
    { title: 'Shipping Policy', href: '/policies/shipping-policy' },
  ];

  const list = policies.length ? policies : defaults;

  return (
    <ul
      className="footer-policy-list"
      style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
    >
      {list.map((policy) => (
        <li key={policy.href}>
          <Link
            to={policy.href}
            style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', opacity: 0.7 }}
          >
            {policy.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
