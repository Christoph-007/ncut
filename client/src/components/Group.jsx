/**
 * Group — Converted from blocks/group.liquid
 * Flexible container block (row or column) with alignment, gap,
 * optional background image/video, border, overlay, and link.
 */
export default function Group({
  children,
  contentDirection = 'column',
  verticalOnMobile = true,
  horizontalAlignment = 'flex-start',
  verticalAlignment = 'center',
  horizontalAlignmentColumn = 'flex-start',
  verticalAlignmentColumn = 'center',
  gap = 12,
  width = 'fill',
  widthMobile = 'fill',
  height = 'fit',
  backgroundImage = '',
  toggleOverlay = false,
  overlayColor = '#00000026',
  overlayStyle = 'solid',
  gradientDirection = 'to top',
  border = 'none',
  borderWidth = 1,
  borderOpacity = 100,
  borderRadius = 0,
  link = '',
  openInNewTab = false,
  padding = {},
}) {
  const isRow = contentDirection === 'row';

  const style = {
    display: 'flex',
    flexDirection: contentDirection,
    gap: `${gap}px`,
    justifyContent: isRow ? horizontalAlignment : verticalAlignmentColumn,
    alignItems: isRow ? verticalAlignment : horizontalAlignmentColumn,
    width: width === 'fill' ? '100%' : width === 'fit-content' ? 'fit-content' : undefined,
    height: height === 'fill' ? '100%' : 'auto',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
    border:
      border !== 'none'
        ? `${borderWidth}px solid rgba(var(--color-border-rgb, 0,0,0) / ${borderOpacity / 100})`
        : undefined,
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
    ...(backgroundImage && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
  };

  const overlayStyle_ = toggleOverlay
    ? {
        position: 'absolute',
        inset: 0,
        background:
          overlayStyle === 'gradient'
            ? `linear-gradient(${gradientDirection}, ${overlayColor}, transparent)`
            : overlayColor,
        pointerEvents: 'none',
        zIndex: 1,
      }
    : null;

  const inner = (
    <div
      className={[
        'group-block',
        isRow ? 'layout-panel-flex--row' : 'layout-panel-flex--column',
        isRow && verticalOnMobile ? 'mobile-column' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {toggleOverlay && <div style={overlayStyle_} aria-hidden="true" />}
      <div style={{ position: 'relative', zIndex: 2, display: 'contents' }}>{children}</div>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        style={{ display: 'contents', textDecoration: 'none' }}
      >
        {inner}
      </a>
    );
  }

  return inner;
}
