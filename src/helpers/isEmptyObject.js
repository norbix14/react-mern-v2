/**
 * Verify if the provided object is valid and is empty.
 *
 * @param {object} obj - Object to check.
 *
 * @example
 * const obj = {}
 * if (isEmptyObject(obj)) {
 *  console.log('Object is empty')
 * } else {
 *  console.log('Object is not empty')
 * }
 * // Object is empty
 *
 * @returns {boolean} true if the object is empty, false otherwise.
 */
const isEmptyObject = (obj) => {
  if (obj instanceof Object) {
    if (Object.keys(obj).length <= 0) {
      return true
    }
    return false
  } else {
    throw new Error('Provide a valid object')
  }
}

export default isEmptyObject
