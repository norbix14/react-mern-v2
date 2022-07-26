import PropTypes from 'prop-types'

const TaskPriorityPill = ({ priority }) => {
  const isPriority = priority ?? false
  const priorityMap = {
    Low: 'bg-green-500',
    Medium: 'bg-orange-500',
    High: 'bg-red-500',
  }
  const showPriority = isPriority ? priorityMap[isPriority] : 'bg-gray-500'
  return (
    <p className={`px-2 font-bold rounded-md text-white ${showPriority}`}>
      {isPriority || '-'}
    </p>
  )
}

TaskPriorityPill.propTypes = {
  priority: PropTypes.string.isRequired,
}

export default TaskPriorityPill
