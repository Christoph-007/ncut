import { Link } from 'react-router-dom';

/**
 * Logo — Converted from blocks/logo.liquid
 * Site logo with configurable size and optional link.
 *
 * Props:
 *   src       {string}  — logo image URL
 *   alt       {string}  — alt text
 *   link      {string}  — href (defaults to '/')
 *   width     {number}  — logo width in px (or percent if usePercent=true)
 *   usePercent {boolean}
 */
export default function Logo({ src = '', alt = 'Logo', link = '/', width = 120, usePercent = false }) {
  const imgStyle = {
    display: 'block',
    width: usePercent ? `${width}%` : `${width}px`,
    maxWidth: '100%',
    height: 'auto',
  };

  const content = src ? (
    <img src={src} alt={alt} style={imgStyle} className="logo__image" />
  ) : (
    <span className="logo__text" style={{ fontWeight: 700, fontSize: '1.25rem' }}>{alt}</span>
  );

  return (
    <Link to={link} className="logo" style={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}>
      {content}
    </Link>
  );
}
