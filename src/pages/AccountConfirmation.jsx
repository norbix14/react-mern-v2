import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { AlertMessage } from './components'

import { axiosRequest } from '../helpers'

const AccountConfirmation = () => {
	const { id } = useParams()
	const [ isConfirming, setIsConfirming ] = useState(true)
	const [ isConfirmed, setIsConfirmed ] = useState(false)
	const [ confirmationMessage, setConfirmationMessage ] = useState('')
	useEffect(() => {
		const confirmAccount = async (_id) => {
			try {
				const [ result, error ] = await axiosRequest({
					url: `/users/confirm/${_id}`,
					method: 'GET',
				})
				if (error) {
					const { response: { data } } = error
					setConfirmationMessage(data.msg)
				} else {
					setIsConfirmed(true)
					setConfirmationMessage(result.data.msg)
				}
			} catch (error) {
				setConfirmationMessage('Something bad happened')
			} finally {
				setIsConfirming(false)
			}
		}
		confirmAccount(id)
	}, [])
	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Confirm account and start creating {' '}
				<span className="text-slate-700">projects</span>
			</h1>
			<div
				className="
					mt-20 shadow-lg px-5 py-10 rounded-xl bg-white
					md:mt-10
				"
			>
				{
					isConfirming ? (
						<AlertMessage alert={{
							error: false,
							message: 'Confirming account...'
						}} />
					) : (
						<>
							{
								isConfirmed ? (
									<>
										<AlertMessage
											alert={{
												error: false,
												message: confirmationMessage
											}}
										/>
										<Link
											className="
												block text-center my-5 text-slate-500 uppercase 
												text-sm 
											"
											to="/"
										>Congrats! Now you can log in into your account</Link>
									</>
								) : (
									<AlertMessage
										alert={{
											error: true,
											message: confirmationMessage
										}}
									/>
								)
							}
						</>
					)
				}
			</div>
		</>
	)
}

export default AccountConfirmation
