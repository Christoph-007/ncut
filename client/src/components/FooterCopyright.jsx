/**
 * FooterCopyright — Converted from blocks/footer-copyright.liquid
 * Displays copyright text in the footer.
 */
export default function FooterCopyright({ shopName = '', year = new Date().getFullYear() }) {
  return (
    <p className="footer-copyright" style={{ margin: 0, fontSize: '0.875rem', opacity: 0.7 }}>
      © {year} {shopName || window?.location?.hostname || 'Shop'}. All rights reserved.
    </p>
  );
}
