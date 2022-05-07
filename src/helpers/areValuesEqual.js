/**
 * Check if the two values are equal.
 * 
 * @param {string} value1 - The first value to be compared.
 * @param {string} value2 - The second value to be compared.
 * 
 * @returns {boolean} true if the values are equal, false otherwise.
 * 
 * @example
 * if (areValuesEqual('test', 'test')) {
 *  console.log('The values are equal');
 * } else {
 *  console.log('The values are not equal');
 * }
 * // The values are equal
 * 
 */
const areValuesEqual = (value1, value2) => {
  const isEmpty = (_value) => String(_value).trim() === ''
  const cleanValue = (_value) => String(_value).trim()
  if (!value1 || !value2) return false
  if (isEmpty(value1) || isEmpty(value2)) return false
  if (cleanValue(value1) !== cleanValue(value2)) return false
  return true
}

export default areValuesEqual
