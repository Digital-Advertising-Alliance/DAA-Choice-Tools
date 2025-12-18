import {BINARY_CONFIG} from "./binaryConfig";
import {base64ToBinary} from "./base64Converter";
import {convertToObj} from "./binaryConverter";
import { convertBase64URLtoBase64 } from "./base64URLConverter";

/**
 * Decodes an ad preferences string into an ad preferences data object.
 *
 * @param {string} adPreferencesString - The encoded ad preferences string.
 * @returns {Object} - The decoded ad preferences data.
 */
export const decodeAdPreferencesString = (adPreferencesString) => {
  const base64String = convertBase64URLtoBase64(adPreferencesString);
  const binaryString = base64ToBinary(base64String);
  return convertToObj(binaryString, BINARY_CONFIG);
}