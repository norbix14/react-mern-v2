/**
 * Show the date in a pretty way.
 * 
 * @param {number} timestamp - timestamp to be formatted.
 * @param {string} locale - locale to be used.
 * 
 * @returns {string} the formatted date.
 * 
 * @example
 * const date = new Date().getTime();
 * console.log(`Function was called '${prettyDate(date, "en")}'.`);
 * // Function was called '5 seconds ago'.
 * 
 */
const timeAgo = (timestamp, locale) => {
  const DATE_UNITS = {
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }
  const rft = new Intl.RelativeTimeFormat(locale)
  const _getSecondsDiff = (_timestamp) => {
    return (Date.now() - _timestamp) / 1000
  }
  const _getUnitAndValueDate = (_dateUnits, _secondsElapsed) => {
    const entries = Object.entries(_dateUnits)
    for (const [_unit, _secondsInUnit] of entries) {
      const match = _secondsElapsed >= _secondsInUnit || _unit === 'second'
      if (match) {
        const _value = Math.floor(_secondsElapsed / _secondsInUnit) * -1
        return { value: _value, unit: _unit }
      }
    }
  }
  const secondsElapsed = _getSecondsDiff(timestamp)
  const { value, unit } = _getUnitAndValueDate(DATE_UNITS, secondsElapsed)
  return rft.format(value, unit)
}

export default timeAgo
