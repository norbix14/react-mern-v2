/**
 * Verify if the session time is valid.
 *
 * @param {number} minutes - minutes of the session.
 * @param {number} seconds - seconds of the session.
 *
 * @example
 * isValidSessionTime(1, 1) // true
 * isValidSessionTime(0, 1) // true
 * isValidSessionTime(1, 0) // true
 * isValidSessionTime(0, 0) // false
 *
 * @returns {boolean} true if the values are valid, false otherwise.
 */
const isValidSessionTime = (minutes, seconds) => {
  const isValidMinutes = minutes ?? false
  const isValidSeconds = seconds ?? false
  const isMinutesNum = typeof isValidMinutes === 'number'
  const isSecondsNum = typeof isValidSeconds === 'number'
  if (isMinutesNum && isSecondsNum) {
    if ((minutes === 0 && seconds === 0) || (minutes < 0 && seconds < 0)) {
      return false
    }
    return true
  }
  return false
}

export default isValidSessionTime
