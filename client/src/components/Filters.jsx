import { useState, useCallback } from 'react';

/**
 * Filters — Converted from blocks/filters.liquid
 * Product filtering and sorting UI (horizontal or vertical layout).
 *
 * Props:
 *   filters         {Array<{label, type, values}>}  — filter groups
 *   activeFilters   {object}  — {filterLabel: [selectedValues]}
 *   onFilterChange  {function} — (label, values) => void
 *   sortOptions     {Array<{label, value}>}
 *   currentSort     {string}
 *   onSortChange    {function}
 *   productCount    {number}
 *   filterStyle     {string}  — 'horizontal' | 'vertical'
 *   enableFiltering {boolean}
 *   enableSorting   {boolean}
 */
export default function Filters({
  filters = [],
  activeFilters = {},
  onFilterChange,
  sortOptions = [],
  currentSort = '',
  onSortChange,
  productCount = 0,
  filterStyle = 'horizontal',
  enableFiltering = true,
  enableSorting = true,
}) {
  const [openFilter, setOpenFilter] = useState(null);

  const defaultSortOptions = [
    { label: 'Featured', value: 'manual' },
    { label: 'Price: Low to High', value: 'price-ascending' },
    { label: 'Price: High to Low', value: 'price-descending' },
    { label: 'Newest', value: 'created-descending' },
    { label: 'Best Selling', value: 'best-selling' },
  ];

  const sorts = sortOptions.length ? sortOptions : defaultSortOptions;

  const totalActive = Object.values(activeFilters).reduce((sum, v) => sum + v.length, 0);

  function toggleValue(filterLabel, value) {
    const current = activeFilters[filterLabel] ?? [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange?.(filterLabel, updated);
  }

  const isVertical = filterStyle === 'vertical';

  const barStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    alignItems: 'center',
    marginBottom: isVertical ? 0 : '1rem',
  };

  return (
    <div className={`facets facets--${filterStyle}`}>
      {/* Sort + filter bar */}
      <div className="facets-controls-wrapper" style={barStyle}>
        {enableFiltering && filters.map((filter) => {
          const isOpen = openFilter === filter.label;
          const activeCount = (activeFilters[filter.label] ?? []).length;

          return (
            <div key={filter.label} style={{ position: 'relative' }}>
              <button
                type="button"
                className="facets__filter-btn"
                onClick={() => setOpenFilter(isOpen ? null : filter.label)}
                style={{
                  padding: '0.375rem 0.75rem',
                  border: '1px solid var(--color-border, #ccc)',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                {filter.label}
                {activeCount > 0 && (
                  <span
                    style={{
                      background: 'var(--color-primary, #000)',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '1.25rem',
                      height: '1.25rem',
                      fontSize: '0.75rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {activeCount}
                  </span>
                )}
                <span aria-hidden="true" style={{ fontSize: '0.75rem', marginLeft: '0.125rem' }}>▾</span>
              </button>

              {isOpen && (
                <div
                  className="facets__dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 100,
                    background: 'var(--color-background, #fff)',
                    border: '1px solid var(--color-border, #ccc)',
                    padding: '0.75rem',
                    minWidth: '200px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  {filter.type === 'price_range' ? (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="number"
                        placeholder="Min"
                        style={{ width: '80px', padding: '0.25rem' }}
                        onChange={(e) => onFilterChange?.(filter.label, [e.target.value, activeFilters[filter.label]?.[1] ?? ''])}
                      />
                      <span>–</span>
                      <input
                        type="number"
                        placeholder="Max"
                        style={{ width: '80px', padding: '0.25rem' }}
                        onChange={(e) => onFilterChange?.(filter.label, [activeFilters[filter.label]?.[0] ?? '', e.target.value])}
                      />
                    </div>
                  ) : (
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {(filter.values ?? []).map((val) => {
                        const checked = (activeFilters[filter.label] ?? []).includes(val.value ?? val);
                        return (
                          <li key={val.value ?? val}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleValue(filter.label, val.value ?? val)}
                              />
                              {val.label ?? val}
                              {val.count != null && (
                                <span style={{ opacity: 0.5, fontSize: '0.875rem' }}>({val.count})</span>
                              )}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {enableFiltering && totalActive > 0 && (
          <button
            type="button"
            className="facets__clear-btn"
            onClick={() => Object.keys(activeFilters).forEach((k) => onFilterChange?.(k, []))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.875rem' }}
          >
            Clear all ({totalActive})
          </button>
        )}

        <span style={{ marginLeft: 'auto', fontSize: '0.875rem', opacity: 0.6 }}>
          {productCount} product{productCount !== 1 ? 's' : ''}
        </span>

        {enableSorting && (
          <select
            className="facets__sort-select"
            value={currentSort}
            onChange={(e) => onSortChange?.(e.target.value)}
            style={{ padding: '0.375rem 0.5rem', border: '1px solid var(--color-border, #ccc)', background: 'transparent', cursor: 'pointer' }}
          >
            {sorts.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
