/**
 * Divider — ported from sections/divider.liquid
 * A visual separator with customizable margins mapped from the section gap options.
 */
export default function Divider({ opacity = 0.1, thickness = "1px", marginY = "4rem", color = "var(--color-foreground)" }) {
  return (
    <div 
      className="divider-wrapper container"
      style={{
        paddingTop: marginY,
        paddingBottom: marginY,
        width: '100%'
      }}
    >
      <hr 
        style={{
          border: 'none',
          height: thickness,
          backgroundColor: color,
          opacity: opacity,
          margin: 0
        }}
        aria-hidden="true"
      />
    </div>
  );
}
