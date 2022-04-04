import {
	useState,
	useEffect,
	createContext
} from 'react'
//import { useNavigate } from 'react-router-dom'

import {
	axiosRequest
} from '../helpers'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [ loading, setLoading ] = useState(true)
	const [ authData, setAuthData ] = useState({})
	//const navigateTo = useNavigate()
	useEffect(() => {
		const token = JSON.parse(window.localStorage.getItem('token'))
		const user = JSON.parse(window.localStorage.getItem('user'))
		const authentication = async (_token, _user) => {
			if (!_token) {
				setLoading(false)
				return
			} else {
				if (_user) {
					setAuthData({
						logged: true,
						token: _token,
						user: _user,
					})
				} else {
					const [ result, error ] = await axiosRequest({
						url: '/users/profile',
						method: 'GET',
					})
					if (error) {
						setAuthData({
							logged: false,
							token: null,
							user: {},
						})
					} else {
						const { data } = result
						const { token, user } = data
						const userData = {
							_id: user._id,
							name: user.name,
							email: user.email,
							createdAt: new Date(user.createdAt).getTime(),
							updatedAt: new Date(user.updatedAt).getTime(),
						}
						setAuthData({
							logged: true,
							token,
							user: userData,
						})
						window.localStorage.setItem('user', JSON.stringify(userData))
					}
				}
				//navigateTo('/projects')
			}
			setLoading(false)
		}
		authentication(token, user)
	}, [])
	return (
		<AuthContext.Provider
			value={{
				authData,
				loading,
				setAuthData,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export {
	AuthProvider,
}

export default AuthContext
