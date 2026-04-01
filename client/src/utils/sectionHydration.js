/**
 * Section hydration utility.
 * In the React app, sections are rendered by React components, so this utility
 * is kept for reference but will generally not be used directly.
 */
import { onDocumentReady, requestIdleCallback } from './utilities.js';

/**
 * Fetches and hydrates a component from the backend API.
 * @param {string} sectionId - The section/component ID to hydrate
 * @param {string} [url] - The URL to fetch from (defaults to current page)
 */
async function hydrateSection(sectionId, url) {
  const section = document.getElementById(`section-${sectionId}`);
  if (!section || section.dataset.hydrated === 'true') return;

  try {
    const fetchUrl = url || window.location.href;
    const response = await fetch(`/api/sections/${sectionId}?url=${encodeURIComponent(fetchUrl)}`);
    if (!response.ok) return;
    // In a React app, hydration would trigger a re-render via state/context
    section.dataset.hydrated = 'true';
  } catch (_e) {
    // no-op
  }
}

/**
 * Hydrates a section when the DOM is ready.
 * @param {string} sectionId
 * @param {string} [url]
 */
export async function hydrate(sectionId, url) {
  onDocumentReady(() => {
    requestIdleCallback(() => hydrateSection(sectionId, url));
  });
}
