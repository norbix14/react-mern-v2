import { useState } from 'react'

const useHandlerInputChange = (initialState) => {
	const [ state, setState ] = useState(initialState)
	const handleChange = (e) => {
		const { target } = e
		const { name, value } = target
		setState((prev) => {
			return {
				...prev,
				[name]: value
			}
		})
	}
	const reset = () => setState(initialState)
	return [state, handleChange, reset]
}

export default useHandlerInputChange
