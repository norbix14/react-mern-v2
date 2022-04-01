import PropTypes from 'prop-types'

const Input = (props) => {
	const { id, label, placeholder, type, value, onChange } = props
	return (
		<>
			<div className="my-5">
				<label
					className="uppercase text-gray-600 block text-xl font-bold"
					htmlFor={id}
				>{label}</label>
				<input
					className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
					required
					type={type}
					placeholder={placeholder}
					id={id}
					name={id}
					value={value}
					onChange={onChange}
					{ ...props }
				/>
			</div>
		</>
	)
}

Input.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default Input
