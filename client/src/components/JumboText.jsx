/**
 * JumboText — Converted from blocks/jumbo-text.liquid
 * Large decorative display text, optionally animated.
 *
 * Props:
 *   text        {string}
 *   fontSize    {string}  — CSS font-size value
 *   alignment   {string}  — 'left' | 'center' | 'right'
 *   color       {string}  — CSS color
 *   animate     {boolean} — enable blur-reveal animation
 *   padding     {object}
 */
export default function JumboText({
  text = '',
  fontSize = '7.5rem',
  alignment = 'left',
  color = 'var(--color-foreground)',
  animate = false,
  padding = {},
}) {
  const style = {
    fontSize,
    textAlign: alignment,
    color,
    lineHeight: 1,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
    ...(animate && {
      animation: 'jumbo-reveal 0.6s ease forwards',
    }),
  };

  return (
    <div className={`jumbo-text${animate ? ' jumbo-text--animated' : ''}`} style={style}>
      {text}
    </div>
  );
}
