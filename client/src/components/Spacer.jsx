/**
 * Spacer — Converted from blocks/spacer.liquid
 * Flexible spacing block (percent or pixel).
 */
export default function Spacer({
  size = 'percent',
  percentSize = 100,
  pixelSize = 120,
  customMobileSize = false,
  sizeMobile = 'percent',
  percentSizeMobile = 100,
  pixelSizeMobile = 120,
}) {
  const style = {
    '--spacer-size': size === 'percent' ? String(percentSize / 100) : `${pixelSize}px`,
    ...(customMobileSize && {
      '--spacer-size-mobile':
        sizeMobile === 'percent' ? `${percentSizeMobile}%` : `${pixelSizeMobile}px`,
    }),
  };

  const classes = [
    'spacer-block',
    `spacer-block--size-${size}`,
    customMobileSize ? `spacer-block--size-mobile-${sizeMobile}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} style={style} data-testid="spacer-block" />;
}
