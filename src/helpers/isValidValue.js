/**
 * Check if the value is valid and is not empty.
 * 
 * @param {string} value - The value to be validated.
 * 
 * @returns {boolean} true if the value is valid, false otherwise.
 * 
 * @example
 * if (isValidValue('test')) {
 *  console.log('The value is valid');
 * } else {
 *  console.log('The value is not valid');
 * }
 * // The value is valid
 * 
 */
export default function isValidValue(value) {
  if (!value || String(value).trim() === '') return false
  return true
}
