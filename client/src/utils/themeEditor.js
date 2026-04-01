/**
 * Theme editor state management utilities.
 * In a React/Vite app there is no Shopify theme editor, so most of this
 * is a no-op. The module is kept so imports don't break.
 */

export const isThemeEditor = false;

/**
 * No-op in the React app.
 * In the Shopify theme editor this would restore UI state (open drawers, etc.)
 * after a live-reload.
 */
export function initThemeEditorStateManager() {
  // No-op: no Shopify theme editor in the React app.
}
