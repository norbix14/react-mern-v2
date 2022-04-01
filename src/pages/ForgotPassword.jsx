import { useState } from 'react'
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
	isAnyEmptyValue,
	axiosRequest,
	isValidEmail
} from '../helpers'

const ForgotPassword = () => {
	const initialState = {
		email: '',
	}
	const [ btnDisabled, setBtnDisabled ] = useState(false)
	const [ confirmationMessage, setConfirmationMessage ] = useState('')
	const [ instructionSend, setInstructionSend ] = useState(false)
	const [ instructionData, setInstructionData ] = useState({
		error: false,
		message: '',
	})
	const [ fieldError, setFieldError ] = useState(false)
	const [ values, handleChange, reset ] = useHandlerInputChange(initialState)
	const handleSubmit = async (e) => {
		e.preventDefault()
		setBtnDisabled(true)
		try {
			if (isAnyEmptyValue(values)) {
				throw new Error('Email required')
			}
			if (!isValidEmail(values.email)) {
				throw new Error('Invalid email')
			}
			let err, msg
			const [ result, error ] = await axiosRequest({
				url: '/users/forgot',
				method: 'POST',
				data: values,
			})
			setFieldError(false)
			setInstructionSend(true)
			if (error) {
				const { response: { data } } = error
				err = true
				msg = data.msg
			} else {
				err = false
				msg = result.data.msg
				reset()
			}
			setInstructionData({ error: err, message: msg })
			setConfirmationMessage(msg)
		} catch (error) {
			setInstructionSend(false)
			setFieldError(true)
			setConfirmationMessage(error.message || 'Something bad happened')
		} finally {
			setBtnDisabled(false)
		}
	}
	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Recover your account and check your {' '}
				<span className="text-slate-700">projects</span>
			</h1>
			<form
				className="my-10 bg-white shadow rounded-lg p-10"
				onSubmit={handleSubmit}
			>
				<Input
					id="email"
					label="email"
					placeholder="Email"
					type="email"
					value={values.email}
					onChange={handleChange}
				/>
				<InputSubmit
					value="send instructions"
					disabled={btnDisabled}
				/>
				{
					instructionSend && (
						<AlertMessage
							alert={instructionData}
						/>
					)
				}
				{
					fieldError && 
					<AlertMessage
						alert={{ error: true, message: confirmationMessage }}
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
					to="/"
				>i remember my password now</Link>
			</nav>
		</>
	)
}

export default ForgotPassword
