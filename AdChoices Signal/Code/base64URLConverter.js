/**
 * A mapping of standard Base64 characters to their URL-safe equivalents.
 */
export const BASE64_TO_BASE64URL_SYMBOLS_MAP = {
  '+': '-',
  '/': '_',
  '=': ''
}

/**
 * Converts a standard Base64 string into a URL-safe Base64 string by replacing
 * specific characters that are not safe for URLs.
 *
 * @param {string} base64String - The standard Base64 encoded string.
 * @returns {string} - The URL-safe Base64 encoded string.
 */
export const convertBase64toBase64URL = (base64String) => {
  return Object.keys(BASE64_TO_BASE64URL_SYMBOLS_MAP).reduce((newString, base64Symbol) => {
    return newString.replaceAll(base64Symbol, BASE64_TO_BASE64URL_SYMBOLS_MAP[base64Symbol]);
  }, base64String);
}

/**
 * Converts a URL-safe Base64 string back to its standard Base64 format
 * by replacing URL-safe characters with their original Base64 counterparts.
 *
 * @param {string} base64URLString - The URL-safe Base64 encoded string.
 * @returns {string} - The standard Base64 encoded string.
 */
export const convertBase64URLtoBase64 = (base64URLString) => {
  return Object.keys(BASE64_TO_BASE64URL_SYMBOLS_MAP).reduce((newString, base64Symbol) => {
    const base64URLSymbol = BASE64_TO_BASE64URL_SYMBOLS_MAP[base64Symbol];

    if (base64URLSymbol.length) {
      return newString.replaceAll(base64URLSymbol, base64Symbol);
    }

    return newString
  }, base64URLString);
}
