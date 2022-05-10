import axios from 'axios'

/**
 * Make a request to the url specified with the method provided.
 * 
 * @param {object} data - options fot the axios request.
 * 
 * @param {string} data.url - url to make the request to.
 * @param {string} data.method - method to use for the request.
 * @param {object} data.data - data to send with the request.
 * 
 * @returns {Promise} an array with the result of the request and the error if any.
 * 
 * @example
 * const [ result, error ] = await axiosRequest({
 *  url: 'https://jsonplaceholder.typicode.com/posts/1',
 *  method: 'GET',
 *  data: {},
 * });
 * if (err) {
 *  console.error(err);
 * } else {
 *  console.log(result);
 * }
 * 
 */
const axiosRequest = async (data = { url, method, data }) => {
  const baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`
  const _axios = axios.create({
    baseURL,
    timeout: 10000,
  })
  const tokenFromStorage = window.localStorage.getItem('token')
  const token = tokenFromStorage === null ? '' : JSON.parse(tokenFromStorage)
  const axiosConfig = {
    url: data.url,
    method: data.method || 'GET',
    data: data.data || {},
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const _getResult = async (_asyncFunc) => {
    let _result, _petition
    try {
      _petition = await _asyncFunc
      _result = [_petition, null]
    } catch (error) {
      _result = [null, error]
    }
    return _result
  }
  const [result, error] = await _getResult(_axios(axiosConfig))
  return [result, error]
}

export default axiosRequest
