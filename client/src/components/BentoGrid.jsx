/**
 * BentoGrid — ported from snippets/bento-grid.liquid
 * Implements a CSS grid layout allowing children to span multiple rows/columns.
 * The original snippet used dense layout strategies which are applied via CSS variables.
 */
export default function BentoGrid({ 
  children, 
  columns = 3, 
  gap = "1.5rem", 
  density = "dense", // 'dense' allows masonry-like CSS fitting
  minItemWidth = "250px"
}) {
  return (
    <div 
      className={`bento-grid bento-grid--${density}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
        gridAutoFlow: density,
        gap: gap,
        width: '100%'
      }}
    >
      {/* 
        Children mapped here. In a real scenario, specific grid items 
        should have styles applying 'grid-column: span 2' or 'grid-row: span 2'
        to achieve the true "bento box" staggered look.
      */}
      {children}
    </div>
  );
}
