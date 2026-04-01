/**
 * PageContent — Converted from blocks/page-content.liquid
 * Renders rich text / HTML page content (body of a CMS page).
 *
 * Props:
 *   content {string} — HTML string
 *   padding {object}
 */
export default function PageContent({ content = '', padding = {} }) {
  const style = {
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  return (
    <div
      className="page-content rte"
      style={style}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
