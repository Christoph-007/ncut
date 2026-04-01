/**
 * TextBlock — Converted from blocks/text.liquid
 * Renders rich text content with typography presets.
 */
export default function TextBlock({
  text = '',
  typePreset = 'rte',
  width = 'fit-content',
  maxWidth = 'normal',
  alignment = 'left',
  color = 'var(--color-foreground)',
  background = false,
  backgroundColor = '#00000026',
  cornerRadius = 0,
  padding = {},
}) {
  const isRte = typePreset === 'rte' || typePreset === 'paragraph';

  const classes = [
    'text-block',
    width === '100%' ? `text-block--align-${alignment}` : '',
    width === '100%' && maxWidth === 'none' ? 'text-block--full-width' : '',
    background ? 'text-block--background' : '',
    isRte ? 'rte' : '',
    typePreset || 'paragraph',
    `text-${alignment}`,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    color,
    width,
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
    ...(background && {
      backgroundColor,
      borderRadius: `${cornerRadius}px`,
    }),
  };

  return (
    <div
      className={classes}
      style={style}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
