/**
 * Localization utilities — adapted from the Horizon theme's localization web components.
 * In the React app these are plain functions used by Localization React components.
 */
import { normalizeString, onAnimationEnd, isClickedOutside } from './utilities.js';

/**
 * Finds localization matches for a search value in a country element.
 * @param {string} searchValue
 * @param {HTMLElement} countryEl
 * @param {Object} options
 * @returns {Object} matchTypes
 */
export function findCountryMatches(
  searchValue,
  countryEl,
  options = { matchLabel: true, matchAlias: true, matchIso: true, matchCurrency: true, labelMatchStart: false, aliasExactMatch: false }
) {
  let matchTypes = {};
  const { aliases, value: iso } = countryEl.dataset;

  if (options.matchLabel) {
    const countryName = normalizeString(countryEl.querySelector('.country')?.textContent ?? '');
    if (!countryName) return matchTypes;
    matchTypes.label = options.labelMatchStart ? countryName.startsWith(searchValue) : countryName.includes(searchValue);
  }
  if (options.matchCurrency) {
    const currency = normalizeString(countryEl.querySelector('.localization-form__currency')?.textContent ?? '');
    matchTypes.currency = currency.includes(searchValue);
  }
  if (options.matchIso) {
    matchTypes.iso = normalizeString(iso ?? '') === searchValue;
  }
  if (options.matchAlias) {
    const countryAliases = aliases?.split(',').map((alias) => normalizeString(alias));
    if (!countryAliases) return matchTypes;
    matchTypes.alias =
      countryAliases.length > 0 &&
      countryAliases.find((alias) =>
        options.aliasExactMatch ? alias === searchValue : alias.startsWith(searchValue)
      ) !== undefined;
  }

  return matchTypes;
}

/**
 * Highlights matching text in a string by wrapping it in <mark> tags.
 * @param {string|null} text
 * @param {string} searchValue
 * @returns {string}
 */
export function highlightMatches(text, searchValue) {
  if (!text || !searchValue) return text ?? '';
  const normalizedText = normalizeString(text);
  const normalizedSearch = normalizeString(searchValue);
  const startIndex = normalizedText.indexOf(normalizedSearch);
  if (startIndex === -1) return text;
  const endIndex = startIndex + normalizedSearch.length;
  const before = text.slice(0, startIndex);
  const match = text.slice(startIndex, endIndex);
  const after = text.slice(endIndex);
  let result = '';
  if (before) result += `<mark>${before}</mark>`;
  result += match;
  if (after) result += `<mark>${after}</mark>`;
  return result;
}

/**
 * Resizes a language select input to fit its current value.
 * @param {HTMLSelectElement} languageInput
 */
export function resizeLanguageInput(languageInput) {
  if (!languageInput || CSS.supports('field-sizing', 'content')) return;
  for (const option of languageInput.options) {
    if (!option.selected) {
      option.dataset.optionLabel = option.textContent || '';
      option.innerText = '';
    }
  }
  languageInput.style.width = 'fit-content';
  const originalElementWidth = `${Math.ceil(languageInput.offsetWidth) + 1}px`;
  if (languageInput.offsetWidth > 0) languageInput.style.width = originalElementWidth;
  for (const option of languageInput.options) {
    if (option.dataset.optionLabel) {
      option.textContent = option.dataset.optionLabel;
      delete option.dataset.optionLabel;
    }
  }
}
