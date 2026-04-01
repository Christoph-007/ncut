/**
 * IconBlock — Converted from blocks/icon.liquid
 * Displays an SVG icon or custom image with an optional link.
 *
 * Props:
 *   icon    {string}  — icon name (maps to SVG) or image URL
 *   link    {string}
 *   size    {number}  — icon size in px
 *   padding {object}
 */
export default function IconBlock({ icon = '', link = '', size = 24, padding = {} }) {
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${size}px`,
    height: `${size}px`,
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  const isUrl = icon.startsWith('http') || icon.startsWith('/');
  const content = isUrl ? (
    <img src={icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
  ) : (
    <span className={`icon icon-${icon}`} aria-hidden="true" />
  );

  if (link) {
    return (
      <a href={link} style={{ ...style, textDecoration: 'none' }} className="icon-block">
        {content}
      </a>
    );
  }

  return (
    <span style={style} className="icon-block">
      {content}
    </span>
  );
}
