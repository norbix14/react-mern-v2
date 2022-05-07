import PropTypes from 'prop-types'

const InputSubmit = ({ value, disabled = false }) => (
  <>
    <input
      className="
				bg-sky-700 w-full py-3 text-white uppercase font-bold 
				rounded mb-5
				hover:cursor-pointer hover:bg-sky-800 transition-colors
				disabled:opacity-50
			"
      type="submit"
      value={value}
      disabled={disabled}
    />
  </>
)

InputSubmit.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default InputSubmit
