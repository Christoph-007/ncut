import { createContext, useContext, useCallback } from 'react';
import enTranslations from '../locales/en';

const I18nContext = createContext({
  t: (key, vars) => key,
  locale: 'en'
});

export function I18nProvider({ children }) {
  // Hardcoded to English per implementation plan. 
  // Can be easily expanded to read navigator.language and dynamically import other locales.
  const locale = 'en';
  const translations = enTranslations;

  /**
   * Evaluates string dot notation against the JSON object map.
   * e.g. "products.product.add_to_cart" -> "Add to cart"
   */
  const getNestedTranslation = (obj, path) => {
    return path.split('.').reduce((acc, part) => {
      return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj);
  };

  /**
   * Shopify Liquid `t` filter clone.
   * Handles string extraction and variable interpolation: `t('key', { count: 1 })`
   */
  const t = useCallback((path, variables = {}) => {
    let text = getNestedTranslation(translations, path);

    // Fallback if key missing
    if (text === undefined) {
      console.warn(`[i18n] Missing translation key: ${path}`);
      return process.env.NODE_ENV === 'development' ? `[missing: ${path}]` : path;
    }

    // Handle Shopify Pluralization arrays if the JSON key points to an object {"one": "...", "other": "..."}
    if (typeof text === 'object' && text !== null) {
      const count = variables.count !== undefined ? variables.count : 1;
      text = count === 1 ? text.one || text.other : text.other;
    }

    // Handle Shopify Liquid string interpolation e.g., "See {{ count }} items"
    if (typeof text === 'string' && Object.keys(variables).length > 0) {
      Object.keys(variables).forEach(key => {
        // Regex strictly replaces {{ varName }} inside the string
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        text = text.replace(regex, variables[key]);
      });
    }

    return text;
  }, []);

  return (
    <I18nContext.Provider value={{ t, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook meant to be imported by any Component needing the Shopify strings.
 */
export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}
