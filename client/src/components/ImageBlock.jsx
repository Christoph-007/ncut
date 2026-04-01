/**
 * ImageBlock — Converted from blocks/image.liquid
 * Responsive image with aspect ratio, border, and optional link.
 */
export default function ImageBlock({
  src = '',
  alt = '',
  link = '',
  imageRatio = 'adapt',
  width = 'fill',
  widthMobile = 'fill',
  height = 'fit',
  border = 'none',
  borderWidth = 1,
  borderOpacity = 100,
  borderRadius = 0,
  padding = {},
}) {
  const ratioMap = { landscape: '16 / 9', portrait: '4 / 5', square: '1 / 1' };
  const ratio = ratioMap[imageRatio] || 'auto';

  const style = {
    '--ratio': ratio,
    aspectRatio: ratio !== 'auto' ? ratio : undefined,
    display: 'flex',
    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
    border: border !== 'none' ? `${borderWidth}px solid rgba(var(--color-border-rgb, 0,0,0) / ${borderOpacity / 100})` : undefined,
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
    width: width === 'fill' ? '100%' : width === 'fit-content' ? 'fit-content' : undefined,
  };

  const imgStyle = {
    objectFit: 'cover',
    width: '100%',
    height: height === 'fill' ? '100%' : 'auto',
    aspectRatio: ratio !== 'auto' ? ratio : undefined,
    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
  };

  const image = src ? (
    <img src={src} alt={alt} style={imgStyle} className="image-block__image" />
  ) : (
    <div
      className="placeholder-image"
      style={{ ...imgStyle, background: 'var(--color-placeholder, #e8e8e8)' }}
      aria-hidden="true"
    />
  );

  if (link) {
    return (
      <a href={link} className="image-block" style={style}>
        {image}
      </a>
    );
  }

  return (
    <div className="image-block" style={style}>
      {image}
    </div>
  );
}
