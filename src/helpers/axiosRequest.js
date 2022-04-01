import axios from 'axios'

const axiosRequest = async (data = { url, method, data }) => {
	const baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`
	const _axios = axios.create({
		baseURL,
		timeout: 10000,
	})
	const token = localStorage.getItem('token') || ''
	const axiosConfig = {
		url: data.url,
		method: data.method || 'GET',
		data: data.data || {},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const _getResult = async (_asyncFunc) => {
		let _result, _petition
		try {
			_petition = await _asyncFunc
			_result = [ _petition, null ]
		} catch (error) {
			_result = [ null, error ]
		}
		return _result
	}
	const [ result, error ] = await _getResult(_axios(axiosConfig))
	return [ result, error ]
}

export default axiosRequest
