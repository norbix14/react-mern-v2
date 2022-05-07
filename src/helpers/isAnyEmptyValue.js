/**
 * Check if any of the values in the object is empty.
 * 
 * @param {object} obj - Object to be checked.
 * 
 * @returns {boolean} true if any of the values is empty, false otherwise.
 * 
 * @example
 * const obj = {
 *    name: '',
 *    lastname: 'Lastname',
 * };
 * if (isAnyEmptyValue(obj)) {
 *    console.log('There is at least one empty value');
 * } else {
 *    console.log('There is no empty value');
 * }
 * // There is at least one empty value
 * 
 */
export default function isAnyEmptyValue(obj) {
  const someInvalid = []
  const entries = Object.entries(obj)
  if (entries.length <= 0) return true
  entries.forEach((entry) => {
    if (String(entry[1]).trim() === '') {
      someInvalid.push(true)
    }
  })
  return someInvalid.some((el) => el === true)
}
