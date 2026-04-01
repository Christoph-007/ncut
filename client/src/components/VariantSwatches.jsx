/**
 * VariantSwatches — ported from snippets/variant-swatches.liquid
 * Handles the display of visual color dots or size pills driving product option selections.
 */
export default function VariantSwatches({ 
  optionName, 
  values = [], 
  selectedValue, 
  onSelect 
}) {
  const isColor = optionName.toLowerCase().includes('color');

  return (
    <div className="variant-swatch-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--color-foreground)' }}>
        {optionName}: <span style={{ color: 'var(--color-muted)' }}>{selectedValue}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {values.map(val => {
          const isSelected = val === selectedValue;
          
          if (isColor) {
            // Render color dot representation
            return (
              <button
                key={val}
                onClick={() => onSelect(val)}
                title={val}
                className="swatch-color"
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: val.toLowerCase().replace(/ /g, ''), // Fallback CSS color naming
                  border: isSelected ? '2px solid var(--color-foreground)' : '1px solid rgba(255,255,255,0.2)',
                  padding: isSelected ? '2px' : '0',
                  boxShadow: isSelected ? 'inset 0 0 0 2px var(--color-background)' : 'none',
                  cursor: 'pointer', transition: 'transform 0.1s ease',
                  overflow: 'hidden', textIndent: '-9999px' // Hide text
                }}
              >
                {val}
              </button>
            );
          } else {
            // Render standard pill selector
            return (
              <button
                key={val}
                onClick={() => onSelect(val)}
                className="swatch-pill"
                style={{
                  padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer',
                  borderRadius: '4px', transition: 'all 0.2s',
                  backgroundColor: isSelected ? 'var(--color-foreground)' : 'transparent',
                  color: isSelected ? 'var(--color-background)' : 'var(--color-foreground)',
                  border: isSelected ? '1px solid var(--color-foreground)' : '1px solid var(--color-border)',
                }}
              >
                {val}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}
