/**
 * ResultsList React hook — replaces the web component.
 * Use this hook in a component that wraps the product grid.
 */
import { useState, useEffect, useCallback } from 'react';
import { mediaQueryLarge, requestIdleCallback, startViewTransition } from './utilities.js';

/**
 * Hook providing layout switching for a product grid results list.
 * @param {React.RefObject} gridRef - Ref to the grid element
 * @returns {{ layout: string, setLayout: (value: string) => void }}
 */
export function useResultsList(gridRef) {
  const [layout, setLayoutState] = useState('default');

  const applyLayout = useCallback((value) => {
    const grid = gridRef?.current;
    if (!grid) return;
    grid.setAttribute('product-grid-view', value);
  }, [gridRef]);

  const setLayout = useCallback(async (value) => {
    await startViewTransition(() => applyLayout(value), ['product-grid']);
    requestIdleCallback(() => {
      const viewport = mediaQueryLarge?.matches ? 'desktop' : 'mobile';
      sessionStorage.setItem(`product-grid-view-${viewport}`, value);
    });
    setLayoutState(value);
  }, [applyLayout]);

  useEffect(() => {
    const handleMediaQueryChange = (event) => {
      const defaultLayout = 'default';
      applyLayout(defaultLayout);
      setLayoutState(defaultLayout);
    };
    mediaQueryLarge?.addEventListener('change', handleMediaQueryChange);
    return () => mediaQueryLarge?.removeEventListener('change', handleMediaQueryChange);
  }, [applyLayout]);

  return { layout, setLayout };
}

export default useResultsList;
