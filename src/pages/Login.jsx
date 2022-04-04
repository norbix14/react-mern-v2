import { useMemo, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import {
	Input,
	InputSubmit,
	AlertMessage
} from './components'

import {
	useHandlerInputChange,
	useLocalStorage,
	useAuth
} from '../hooks'

import {
	axiosRequest,
	isAnyEmptyValue,
	isValidValueLength,
	isValidEmail
} from '../helpers'

const Login = () => {
	const initialState = {
		email: '',
		password: '',
	}
	const [ btnDisabled, setBtnDisabled ] = useState(false)
	const [ userLogged, setUserLogged ] = useState(false)
	const [ alertData, setAlertData ] = useState({
		error: false,
		message: '',
	})
	const [ logNow, setLogNow ] = useState(false)
	const [ values, handleChange, reset ] = useHandlerInputChange(initialState)
	const [ user, setUser ] = useLocalStorage('user', {})
	const [ token, setToken ] = useLocalStorage('token', '')
	const { authData, loading, setAuthData } = useAuth()
	const navigateTo = useNavigate()
	const timer = 3000
	const inputs = useMemo(() => {
		return [
			{
				id: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'Email',
				key: 1
			},
			{
				id: 'password',
				label: 'Password',
				type: 'password',
				placeholder: 'Password',
				key: 2
			},
		]
	}, [])
	const handleSubmit = async (e) => {
		e.preventDefault()
		setBtnDisabled(true)
		try {
			if(isAnyEmptyValue(values)) {
				throw new Error('All fields are required')
			}
			if (!isValidEmail(values.email)) {
				throw new Error('Invalid email')
			}
			if (!isValidValueLength(values.password)) {
				throw new Error('The password is too short')
			}
			const [ result, error ] = await axiosRequest({
				url: '/users/login',
				method: 'POST',
				data: values,
			})
			if (error) {
				const { response: { data } } = error
				setAlertData({
					error: true,
					message: data.msg,
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
				setUserLogged(true)
				setAlertData({
					error: false,
					message: `Welcome ${userData.name}!`,
				})
				setToken(token)
				setUser(userData)
				setAuthData({
					logged: true,
					token,
					user: userData,
				})
				reset()
				setTimeout(() => {
					setLogNow(true)
				}, timer)
			}
		} catch (error) {
			setAlertData({
				error: true,
				message: error.message || 'Something bad happened'
			})
		} finally {
			setBtnDisabled(false)
		}
	}
	useEffect(() => {
		if (authData.logged) {
			setUserLogged(true)
			if (!alertData.message.startsWith('Welcome')) {
				setAlertData({
					error: false,
					message: `You are already logged. Redirecting...`,
				})
				setTimeout(() => setLogNow(true), timer)
			}
		}
	}, [authData.logged])
	return loading ? (
		<h2 className="text-center">Loading...</h2>
	) : (
		(authData.logged && logNow) ? (
			<Navigate to="/projects" />
		) : (
			<>
				<h1 className="text-sky-600 font-black text-6xl capitalize">
					Log in and check your {' '}
					<span className="text-slate-700">projects</span>
				</h1>
				<form
					className="my-10 bg-white shadow rounded-lg p-10"
					onSubmit={handleSubmit}
				>
					{
						inputs.map(({ id, label, type, placeholder, key }) => (
							<Input
								key={key}
								id={id}
								label={label}
								type={type}
								placeholder={placeholder}
								value={values[id]}
								onChange={handleChange}
								disabled={userLogged}
							/>
						))
					}
					{
						!userLogged ? (
							<InputSubmit
								value="login"
								disabled={btnDisabled}
							/>
						) : (
							<AlertMessage
								alert={alertData}
							/>
						)
					}
					{
						alertData.error &&
						<AlertMessage
							alert={alertData}
						/>
					}
				</form>
				<nav className="lg:flex lg:justify-between">
					<Link
						className="block text-center my-5 text-slate-700 uppercase text-sm"
						to="/register"
					>¿do not have and account? register one</Link>
					<Link
						className="block text-center my-5 text-slate-700 uppercase text-sm"
						to="/forgotpassword"
					>i forgot my password</Link>
				</nav>
			</>
		)
	)
}

export default Login
