/**
 * Check if the specified email is valid and with the right format.
 * 
 * @param {string} email - Email to be checked.
 * 
 * @returns {boolean} true if the email is valid, false otherwise.
 * 
 * @example
 * if (isValidEmail('mail@example.com')) {
 *    console.log('The email is valid');
 * } else {
 *    console.log('The email is not valid');
 * }
 * 
 */
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.trim())
}

export default isValidEmail
