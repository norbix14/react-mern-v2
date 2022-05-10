import PropTypes from 'prop-types'

const Spinner = ({ text = 'Loading...' }) => {
  return (
    <div className="text-center">
      <button
        type="button"
        className="bg-indigo-500 p-2 rounded flex text-white"
        disabled
      >
        <svg
          className="animate-spin h-5 w-5 mr-3 fill-white"
          viewBox="0 0 24 24"
        ></svg>
        {text}
      </button>
    </div>
  )
}

Spinner.propTypes = {
  text: PropTypes.string,
}

export default Spinner
