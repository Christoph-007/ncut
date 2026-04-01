/**
 * Section renderer utility — adapted for the React + Express backend.
 * Shopify Section Rendering API calls are replaced with calls to /api/sections/:id.
 * DOM morphing logic is preserved via the morph utility.
 */
import { morph, MORPH_OPTIONS } from './morph.js';

const SECTION_ID_PREFIX = 'section-';

/**
 * Builds a section selector element ID.
 * @param {string} sectionId
 * @returns {string}
 */
export function buildSectionSelector(sectionId) {
  return `${SECTION_ID_PREFIX}${sectionId}`;
}

/**
 * Normalizes a section ID by stripping the prefix.
 * @param {string} sectionId
 * @returns {string}
 */
export function normalizeSectionId(sectionId) {
  return sectionId.replace(new RegExp(`^${SECTION_ID_PREFIX}`), '');
}

function containsShadowRoot(element) {
  return !!element.shadowRoot || Array.from(element.children).some(containsShadowRoot);
}

/**
 * Morphs the existing section element with new HTML.
 * @param {string} sectionId
 * @param {string} html
 * @param {Object} [options]
 * @param {'hydration'|'full'} [options.mode]
 * @param {boolean} [options.injectStylesheet]
 */
export async function morphSection(sectionId, html, options = {}) {
  const { mode = 'full', injectStylesheet = false } = options;
  const fragment = new DOMParser().parseFromString(html, 'text/html');
  const existingElement = document.getElementById(buildSectionSelector(sectionId));
  const newElement = fragment.getElementById(buildSectionSelector(sectionId));

  if (!existingElement) throw new Error(`Section ${sectionId} not found`);
  if (!newElement) throw new Error(`Section ${sectionId} not found in response`);

  morph(existingElement, newElement, {
    ...MORPH_OPTIONS,
    hydrationMode: mode === 'hydration',
  });

  if (injectStylesheet) injectSectionStylesheet(fragment, existingElement);
}

function injectSectionStylesheet(fragment, sectionElement) {
  const newStylesheet = fragment.querySelector('style[data-section-stylesheet]');
  if (!newStylesheet) return;
  const existingStylesheet = sectionElement.querySelector('style[data-section-stylesheet]');
  if (existingStylesheet) existingStylesheet.textContent = newStylesheet.textContent;
  else sectionElement.prepend(newStylesheet);
}

/**
 * Section renderer — fetches section HTML from the backend and morphs it into the DOM.
 */
class SectionRenderer {
  #cache = new Map();
  #abortControllersBySectionId = new Map();
  #pendingPromises = new Map();

  /**
   * Renders a section by fetching its HTML from the backend.
   * @param {string} sectionId
   * @param {Object} [options]
   * @param {boolean} [options.cache]
   * @param {'hydration'|'full'} [options.mode]
   * @param {string} [options.url]
   * @returns {Promise<string>}
   */
  async renderSection(sectionId, options) {
    const { cache = true, mode = 'full' } = options ?? {};
    const { url } = options ?? {};

    this.#abortPendingMorph(sectionId);
    const abortController = new AbortController();
    this.#abortControllersBySectionId.set(sectionId, abortController);

    const sectionHTML = await this.getSectionHTML(sectionId, cache, url);

    if (!abortController.signal.aborted) {
      this.#abortControllersBySectionId.delete(sectionId);
      morphSection(sectionId, sectionHTML, { mode });
    }

    return sectionHTML;
  }

  #abortPendingMorph(sectionId) {
    const existingAbortController = this.#abortControllersBySectionId.get(sectionId);
    if (existingAbortController) existingAbortController.abort();
  }

  /**
   * Gets HTML for a section from the backend API.
   * @param {string} sectionId
   * @param {boolean} useCache
   * @param {string} [url]
   * @returns {Promise<string>}
   */
  async getSectionHTML(sectionId, useCache = true, url) {
    const apiUrl = `/api/sections/${normalizeSectionId(sectionId)}${url ? `?url=${encodeURIComponent(url)}` : ''}`;

    let pendingPromise = this.#pendingPromises.get(apiUrl);
    if (pendingPromise) return pendingPromise;

    if (useCache) {
      const cachedHTML = this.#cache.get(apiUrl);
      if (cachedHTML) return cachedHTML;
    }

    pendingPromise = fetch(apiUrl).then((response) => response.text());
    this.#pendingPromises.set(apiUrl, pendingPromise);
    const sectionHTML = await pendingPromise;
    this.#pendingPromises.delete(apiUrl);
    this.#cache.set(apiUrl, sectionHTML);
    return sectionHTML;
  }
}

export const sectionRenderer = new SectionRenderer();
