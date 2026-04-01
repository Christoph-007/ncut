import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * MenuBlock — Converted from blocks/menu.liquid
 * Navigation menu with optional accordion mode.
 *
 * Props:
 *   items       {Array<{label, href, children?}>} — nav items
 *   accordion   {boolean} — collapse sub-menus into accordion rows
 *   dividers    {boolean}
 *   padding     {object}
 */
export default function MenuBlock({ items = [], accordion = false, dividers = true, padding = {} }) {
  const [openIndex, setOpenIndex] = useState(null);

  const style = {
    paddingBlockStart: padding.top ? `${padding.top}px` : undefined,
    paddingBlockEnd: padding.bottom ? `${padding.bottom}px` : undefined,
    paddingInlineStart: padding.left ? `${padding.left}px` : undefined,
    paddingInlineEnd: padding.right ? `${padding.right}px` : undefined,
  };

  const listStyle = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    ...(dividers && { gap: 0 }),
  };

  const itemStyle = {
    ...(dividers && {
      borderTop: '1px solid var(--color-border, #e2e8f0)',
    }),
  };

  return (
    <nav className="menu-block" style={style}>
      <ul style={listStyle}>
        {items.map((item, i) => {
          const hasChildren = item.children?.length > 0;
          const isOpen = openIndex === i;

          return (
            <li key={i} style={itemStyle}>
              {hasChildren && accordion ? (
                <>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: '0.75rem 0',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                  </button>
                  {isOpen && (
                    <ul style={{ ...listStyle, paddingLeft: '1rem' }}>
                      {item.children.map((child, j) => (
                        <li key={j} style={{ padding: '0.375rem 0' }}>
                          <Link to={child.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.href || '/'}
                  style={{
                    display: 'block',
                    padding: '0.75rem 0',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
