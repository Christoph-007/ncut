/**
 * PageBlock — Converted from blocks/page.liquid
 * Renders a CMS page's title and content.
 *
 * Props:
 *   page    {object}  — {title, content} from the backend
 *   padding {object}
 */
export default function PageBlock({ page, padding = {} }) {
  if (!page) return null;

  const style = {
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  return (
    <div className="page-block" style={style}>
      {page.title && <h1 className="page-block__title h1" style={{ marginBottom: '1rem' }}>{page.title}</h1>}
      {page.content && (
        <div
          className="page-block__content rte"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}
    </div>
  );
}
