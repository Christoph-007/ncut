/**
 * Money formatting utilities — replicates Shopify's `money` liquid filter client-side.
 */

const DEFAULT_CURRENCY_DECIMALS = 2;

const CURRENCY_DECIMALS = {
  BHD: 3, BIF: 0, BYR: 0, CLF: 4, CLP: 0, DJF: 0, GNF: 0, IQD: 3, ISK: 0,
  JOD: 3, JPY: 0, KMF: 0, KRW: 0, KWD: 3, LYD: 3, MRO: 5, OMR: 3, PYG: 0,
  RWF: 0, TND: 3, UGX: 0, UYI: 0, UYW: 4, VND: 0, VUV: 0, XAF: 0, XAG: 0,
  XAU: 0, XBA: 0, XBB: 0, XBC: 0, XBD: 0, XDR: 0, XOF: 0, XPD: 0, XPF: 0,
  XPT: 0, XSU: 0, XTS: 0, XUA: 0,
};

/**
 * Parses a money string into minor units.
 * @param {string} value
 * @param {string} currency
 * @returns {number|null}
 */
export function convertMoneyToMinorUnits(value, currency) {
  const precision = CURRENCY_DECIMALS[currency.toUpperCase()] ?? DEFAULT_CURRENCY_DECIMALS;
  const multiplier = Math.pow(10, precision);

  if (!value || !value.trim()) return null;

  const parts = value.trim().split(/[^0-9]/).filter(Boolean);
  if (parts.length === 0) return null;

  const lastPart = parts[parts.length - 1] ?? '';
  const lastPartIsDecimal = precision > 0 && parts.length > 1 && lastPart.length <= precision;

  let wholeStr, fractionStr;

  if (lastPartIsDecimal) {
    fractionStr = lastPart;
    wholeStr = parts.slice(0, -1).join('');
  } else {
    wholeStr = parts.join('');
    fractionStr = '';
  }

  const whole = parseInt(wholeStr, 10);
  if (isNaN(whole)) return null;

  let fraction = 0;
  if (precision > 0 && fractionStr) {
    fraction = parseInt(fractionStr, 10) || 0;
    fraction = fraction * Math.pow(10, precision - fractionStr.length);
  }

  return whole * multiplier + fraction;
}

function formatCents(moneyValue, thousandsSeparator, decimalSeparator, precision, divisor) {
  const roundedNumber = (moneyValue / divisor).toFixed(precision);
  let [a, b] = roundedNumber.split('.');
  if (!a) a = '0';
  if (!b) b = '';
  a = a.replace(/\d(?=(\d\d\d)+(?!\d))/g, (digit) => digit + thousandsSeparator);
  return precision <= 0 ? a : a + decimalSeparator + b.padEnd(precision, '0');
}

/**
 * Formats money, replicating Shopify's `money` liquid filter.
 * @param {number} moneyValue - value in minor units
 * @param {string} format - Shopify money format template (e.g. '${{amount}}')
 * @param {string} currency - currency code (e.g. 'USD')
 * @returns {string}
 */
export function formatMoney(moneyValue, format, currency) {
  const currencyPrecision = CURRENCY_DECIMALS[currency.toUpperCase()] ?? DEFAULT_CURRENCY_DECIMALS;
  const divisor = Math.pow(10, currencyPrecision);

  return format.replace(/{{\s*(\w+)\s*}}/g, (_, placeholder) => {
    if (typeof placeholder !== 'string') return '';
    if (placeholder === 'currency') return currency;

    let thousandsSeparator = ',';
    let decimalSeparator = '.';
    let precision = currencyPrecision;

    switch (placeholder) {
      case 'amount':
        break;
      case 'amount_no_decimals':
        precision = 0;
        break;
      case 'amount_with_comma_separator':
        thousandsSeparator = '.';
        decimalSeparator = ',';
        break;
      case 'amount_no_decimals_with_comma_separator':
        thousandsSeparator = '.';
        precision = 0;
        break;
      case 'amount_no_decimals_with_space_separator':
        thousandsSeparator = ' ';
        precision = 0;
        break;
      case 'amount_with_space_separator':
        thousandsSeparator = ' ';
        decimalSeparator = ',';
        break;
      case 'amount_with_period_and_space_separator':
        thousandsSeparator = ' ';
        decimalSeparator = '.';
        break;
      case 'amount_with_apostrophe_separator':
        thousandsSeparator = "'";
        decimalSeparator = '.';
        break;
      default:
        break;
    }

    return formatCents(moneyValue, thousandsSeparator, decimalSeparator, precision, divisor);
  });
}
