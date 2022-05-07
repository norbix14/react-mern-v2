/**
 * Check if the value has a valid length.
 * 
 * @param {string} value - The value to be validated.
 * @param {number} length - The length of the value.
 * 
 * @returns {boolean} true if the value has the specified length, false otherwise.
 * 
 * @example
 * if (isValidValueLength('test', 4)) {
 *  console.log('The value is valid');
 * } else {
 *  console.log('The value is not valid');
 * }
 * // The value is valid
 * 
 */
const isValidValueLength = (value, length = 6) => {
  const cleanValue = (_value) => String(_value).trim()
  const valueLength = (_value) => cleanValue(_value).length
  if (valueLength(value) <= 0 || valueLength(value) < length) return false
  return true
}

export default isValidValueLength
