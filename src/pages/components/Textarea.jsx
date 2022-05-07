import PropTypes from 'prop-types'

const Textarea = (props) => {
  const { id, label, placeholder, value, onChange } = props
  return (
    <>
      <div className="my-5">
        <label
          className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor={id}
        >
          {label}
        </label>
        <textarea
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          required
          placeholder={placeholder}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          {...props}
        ></textarea>
      </div>
    </>
  )
}

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Textarea
