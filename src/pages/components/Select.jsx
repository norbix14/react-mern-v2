import PropTypes from 'prop-types'

const Select = (props) => {
  const { id, label, placeholder, value, onChange, options } = props
  return (
    <>
      <div className="my-5">
        <label
          className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor={id}
        >
          {label}
        </label>
        <select
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          id={id}
          name={id}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          {...props}
        >
          <option value="" disabled>
            -- Pick one --
          </option>
          {options.map(({ id, label, enum: value, key }) => (
            <option key={key} value={value} id={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Select
