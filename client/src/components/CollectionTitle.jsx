/**
 * CollectionTitle — Converted from blocks/collection-title.liquid
 * Displays the collection title with a typography preset.
 */
export default function CollectionTitle({
  collection,
  typePreset = 'h4',
  alignment = 'left',
  padding = {},
}) {
  const title = collection?.title || 'Collection';

  const style = {
    textAlign: alignment,
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  return (
    <span className={`collection-title ${typePreset}`} style={style}>
      {title}
    </span>
  );
}
