import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
	Input,
	InputSubmit,
	AlertMessage
} from './components'

import {
	useHandlerInputChange
} from '../hooks'

import {
	axiosRequest,
	areValuesEqual,
	isAnyEmptyValue,
	isValidValueLength,
	isValidEmail
} from '../helpers'

const Register = () => {
	const initialState = {
		name: '',
		email: '',
		password: '',
		passwordrepeat: '',
	}
	const initialStateError = {
		error: false,
		message: '',
	}
	const [ btnDisabled, setBtnDisabled ] = useState(false)
	const [ isError, setIsError ] = useState(false)
	const [ accountCreated, setAccountCreated ] = useState(false)
	const [ errorData, setErrorData ] = useState(initialStateError)
	const [ accountData, setAccountData ] = useState(initialStateError)
	const [ values, handleChange, reset ] = useHandlerInputChange(initialState)
	const inputs = useMemo(() => {
		return [
			{
				id: 'name',
				label: 'Name',
				type: 'text',
				placeholder: 'Name',
				key: 1,
			},
			{
				id: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'Email',
				key: 2,
			},
			{
				id: 'password',
				label: 'Password',
				type: 'password',
				placeholder: 'Password',
				key: 3,
			},
			{
				id: 'passwordrepeat',
				label: 'Repeat password',
				type: 'password',
				placeholder: 'Repeat password',
				key: 4,
			},
		]
	}, [])
	const setError = (_error = false, _message = '') => {
		setIsError(_error)
		setErrorData((prev) => (
			{
				...prev,
				error: _error,
				message: _message,
			}
		))
	}
	const setAccountInfo = (_created = false, _message = '') => {
		setAccountCreated(_created)
		setAccountData((prev) => (
			{
				...prev,
				error: false,
				message: _message,
			}
		))
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setBtnDisabled(true)
		try {
			if (isAnyEmptyValue(values)) {
				throw new Error('All fields are required')
			}
			if (!isValidEmail(values.email)) {
				throw new Error('Invalid email')
			}
			if (!areValuesEqual(values.password, values.passwordrepeat)) {
				throw new Error('The passwords do not match')
			}
			if (!isValidValueLength(values.password)) {
				throw new Error('The password is too short')
			}
			setError(false)
			const [ result, error ] = await axiosRequest({ 
				url: '/users/create',
				method: 'POST',
				data: values,
			})
			if (error) {
				const { response: { data } } = error
				setError(true, data.msg)
				setAccountInfo()
			} else {
				setAccountInfo(true, result.data.msg)
				reset()
			}
		} catch (error) {
			setError(true, error.message || 'Something bad happened')
			setAccountInfo()
		} finally {
			setBtnDisabled(false)
		}
	}
	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Create an account and start creating {' '}
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
						/>
					))
				}
				<InputSubmit
					value="create account"
					disabled={btnDisabled}
				/>
				{
					isError && <AlertMessage alert={errorData} />
				}
				{
					accountCreated && <AlertMessage alert={accountData} />
				}
			</form>
			<nav className="lg:flex lg:justify-between">
				<Link
					className="block text-center my-5 text-slate-700 uppercase text-sm"
					to="/"
				>¿already have an account? log in</Link>
				<Link
					className="block text-center my-5 text-slate-700 uppercase text-sm"
					to="/forgotpassword"
				>i forgot my password</Link>
			</nav>
		</>
	)
}

export default Register
