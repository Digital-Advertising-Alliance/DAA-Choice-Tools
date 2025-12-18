/**
 * Converts a binary to a base64-encoded string.
 *
 * @param {string} binary - The binary to be converted.
 * @returns {string} - The base64-encoded string.
 */
export const binaryToBase64 = (binary) => {
  const byteCharacters = binary.match(/.{1,8}/g);
  const byteArray = byteCharacters.map(byte => parseInt(byte, 2));
  return btoa(String.fromCharCode(...new Uint8Array(byteArray)));
}

/**
 * Converts a base64-encoded string to a binary.
 *
 * @param {string} base64 - The base64-encoded string to be converted.
 * @returns {string} - The binary.
 */
export const base64ToBinary = (base64) => {
  const decodedBase64 = decodeURIComponent(base64);
  const binary = atob(decodedBase64);
  const binaryArray = Array.from(binary).map(char => char.charCodeAt(0).toString(2).padStart(8, '0'));
  return binaryArray.join('');
};
