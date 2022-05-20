import PropTypes from 'prop-types'

const AlertMessage = ({ alert }) => {
  return (
    <div
      className={`text-center my-10 p-3 
				rounded-xl text-white uppercase 
				font-bold text-sm
				bg-gradient-to-br
				${alert.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'}
			`}
    >
      {alert.message}
    </div>
  )
}

AlertMessage.propTypes = {
  alert: PropTypes.object.isRequired,
}

export default AlertMessage
