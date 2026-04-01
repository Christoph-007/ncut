import { useState, useEffect } from 'react';

/**
 * FilterSidebar — ported from snippets/list-filter.liquid & price-filter.liquid
 * Maps URL query param logic and facet rendering to an interactive search column.
 */
export default function FilterSidebar({ 
  facets = [], 
  onFilterChange,
  activeFilters = {} 
}) {
  const [minPrice, setMinPrice] = useState(activeFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(activeFilters.maxPrice || '');

  const handleCheckbox = (group, value) => {
    const current = activeFilters[group] || [];
    const updated = current.includes(value) 
      ? current.filter(v => v !== value)
      : [...current, value];
      
    onFilterChange(group, updated);
  };

  const handlePriceApply = () => {
    onFilterChange('price', { min: minPrice, max: maxPrice });
  };

  return (
    <aside className="filter-sidebar" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3 style={{ margin: 0, fontSize: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
        Filters
      </h3>

      {/* Dynamic Facets (Categories, Tags, etc.) */}
      {facets.map((facetGrp) => (
        <div key={facetGrp.name} className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>{facetGrp.name}</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {facetGrp.values.map(val => (
              <label 
                key={val.label} 
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}
              >
                <input 
                  type="checkbox"
                  checked={(activeFilters[facetGrp.name] || []).includes(val.value)}
                  onChange={() => handleCheckbox(facetGrp.name, val.value)}
                  style={{
                    appearance: 'none', width: '18px', height: '18px', border: '1px solid var(--color-border)',
                    borderRadius: '3px', backgroundColor: 'transparent', cursor: 'pointer',
                    position: 'relative' // Ideally add a pseudo::after checkmark here
                  }}
                  className="custom-checkbox"
                />
                {val.label} ({val.count})
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Price Filter ported from price-filter.liquid */}
      <div className="filter-group filter-group--price" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Price Range</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }}>$</span>
            <input 
              type="number" 
              placeholder="From" 
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 1.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'transparent', color: 'var(--color-foreground)' }}
            />
          </div>
          <span>-</span>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }}>$</span>
            <input 
              type="number" 
              placeholder="To" 
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 1.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'transparent', color: 'var(--color-foreground)' }}
            />
          </div>
        </div>
        <button 
          onClick={handlePriceApply}
          style={{ width: '100%', padding: '0.5rem', backgroundColor: 'var(--color-foreground)', color: 'var(--color-background)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
        >
          Apply Price
        </button>
      </div>
      
      <style>{`
        .custom-checkbox:checked { background-color: var(--color-foreground); border-color: var(--color-foreground); }
      `}</style>
    </aside>
  );
}
