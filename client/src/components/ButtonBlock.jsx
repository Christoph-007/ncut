/**
 * ButtonBlock — Converted from blocks/button.liquid
 * Generic link/button block with primary, secondary, or link styles.
 */
export default function ButtonBlock({
  label = 'Shop now',
  link = '/',
  openInNewTab = false,
  styleClass = 'button',
  width = 'fit-content',
  widthMobile = 'fit-content',
  customWidth = 100,
  customWidthMobile = 100,
}) {
  const style = {
    width:
      width === 'custom'
        ? `${customWidth}%`
        : width === 'fit-content'
        ? 'fit-content'
        : '100%',
  };

  return (
    <a
      href={link}
      className={styleClass}
      target={openInNewTab ? '_blank' : '_self'}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      style={style}
    >
      {label}
    </a>
  );
}
