/**
 * Show the date in a pretty way.
 * 
 * @param {Date} date - date to be formatted.
 * @param {string} locale - locale to be used.
 * @param {object} options - options for the date formatting.
 * 
 * @returns {string} the formatted date.
 * 
 * @example
 * const date = new Date();
 * console.log(`Function was called '${prettyDate(date)}'.`);
 * // Function was called 'Saturday, May 7, 2022, 14:41:15'
 * 
 */
const prettyDate = (date, locale = 'en', options = {}) => {
  const opts = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    ...options,
  }
  return new Intl.DateTimeFormat(locale, opts).format(date)
}

export default prettyDate
