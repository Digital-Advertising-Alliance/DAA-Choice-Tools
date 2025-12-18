/**
 * Helper function to convert a decimal number to a binary with specified length.
 *
 * @param {number} decimalValue - The decimal number to be converted to binary.
 * @param {number} binaryLength - The desired length of the resulting binary.
 * @returns {string} - Binary representation of the decimal value with leading zeros.
 */
const decimalToBinary = (decimalValue, binaryLength) => {
  const binary = decimalValue.toString(2);
  const leadingZeros = '0'.repeat(binaryLength - binary.length);
  return leadingZeros + binary;
}

/**
 * Converts a binary to a decimal value.
 *
 * @param {string} binary - The binary to be converted to decimal.
 * @returns {number} - The decimal value converted from the binary.
 */
const binaryToDecimal = (binary) => {
  return parseInt(binary, 2);
};

/**
 * Convert an object's decimal values to a binary.
 *
 * @param {object} obj - The input object to be converted.
 * @param {object} binaryConfig - The binary config.
 * @throws {Error} If a property in the input object does not have a corresponding value in binaryConfig.
 * @returns {string} - Binary representing the converted decimal values.
 */
export const convertToBinary = (obj, binaryConfig) => {
  let binary = '';

  for (const key in obj) {
    if (!binaryConfig.hasOwnProperty(key)) {
      throw new Error(`Could not process array. Property "${key}" does not exist in binary config. ${JSON.stringify(binaryConfig)}`)
    }

    if (Array.isArray(obj[key])) {
      if (!binaryConfig[key].hasOwnProperty("arrayLength")) {
        throw new Error(`Could not process array. Property "arrayLength" does not exist in binary config. ${JSON.stringify(binaryConfig[key])}`)
      }

      binary += decimalToBinary(obj[key].length, binaryConfig[key].arrayLength);

      for (const item of obj[key]) {
        for (const itemKey in item) {
          if (!binaryConfig[key].hasOwnProperty(itemKey)) {
            throw new Error(`Could not process array. Property "${itemKey}" does not exist in binary config. ${JSON.stringify(binaryConfig[key])}`)
          }
          binary += decimalToBinary(item[itemKey], binaryConfig[key][itemKey]);
        }
      }
    } else {
      binary += decimalToBinary(obj[key], binaryConfig[key]);
    }
  }

  if (binary.length % 8 !== 0) {
    binary += '0'.repeat(8 - binary.length % 8); // add zeros to the end of the binary to have correct 8-bit binary
  }

  return binary;
}

/**
 * Convert a binary to an object with decimal values.
 *
 * @param {string} binary - The binary to be parsed.
 * @param {object} binaryConfig - The binary config.
 * @throws {Error} If a property has property type cannot be handled, or in case arrayLength key does not exist when handling an array.
 * @returns {object} - Object with decimal values.
 */
export const convertToObj = (binary, binaryConfig) => {
  const result = {};
  let currentIndex = 0;

  for (const key in binaryConfig) {
    const valueConfig = binaryConfig[key];

    if (typeof binaryConfig[key] === "object") {
      if (!binaryConfig[key].hasOwnProperty("arrayLength")) {
        throw new Error(`Could not process array. Property "arrayLength" does not exist in binary config. ${JSON.stringify(binaryConfig[key])}`)
      }

      result[key] = [];

      const {arrayLength: arrayLengthConfig, ...arrayDataConfig} = binaryConfig[key];
      const splitBinary = binary.substring(currentIndex, currentIndex + arrayLengthConfig);
      const arrayDecimalLength = binaryToDecimal(splitBinary);

      currentIndex += arrayLengthConfig;

      // eslint-disable-next-line
      for (const _ in Array(arrayDecimalLength).fill()) {
        const resultedData = {};

        for (const arrayKey of Object.keys(arrayDataConfig)) {
          const arrayValueConfig = binaryConfig[key][arrayKey];

          if (typeof arrayValueConfig !== "number") {
            throw new Error(`Could not process array value. Property type "${typeof binaryConfig[key][arrayKey]}" could not be handled.`)
          }

          const splitBinary = binary.substring(currentIndex, currentIndex + arrayValueConfig);

          resultedData[arrayKey] = splitBinary.length ? binaryToDecimal(splitBinary) : null;
          currentIndex += arrayValueConfig;
        }

        result[key].push(resultedData);
      }
    } else if (typeof binaryConfig[key] === "number") {
      const splitBinary = binary.substring(currentIndex, currentIndex + valueConfig);

      result[key] = binaryToDecimal(splitBinary);
      currentIndex += valueConfig;
    } else {
      throw new Error(`Could not process binary. Property type "${typeof binaryConfig[key]}" could not be handled.`)
    }
  }

  return result;
}
