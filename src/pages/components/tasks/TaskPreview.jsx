import PropTypes from 'prop-types'

import ButtonTask from '../ButtonTask'

import { prettyDate } from '../../../helpers'

const TaskPreview = ({ task }) => {
  const { name, description, status, timeline, priority, project } = task
  const priorityMap = {
    Low: 'green-500',
    Medium: 'orange-500',
    High: 'red-500',
  }
  const timelineDate = new Date(timeline).getTime() || 0
  return (
    <>
      <div className="border-b p-5 flex justify-between items-center">
        <div>
          <p className="mb-1 text-xl">{name}</p>
          <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
          <p className="mb-1 text-xl text-gray-500">
            {prettyDate(timelineDate)}
          </p>
          <div className="flex justify-start gap-2">
            <p className="mb-1 text-gray-600">Priority: </p>
            <p
              className={`
                px-2 font-bold rounded-md text-white 
                bg-${priorityMap[priority]} 
              `}
            >
              {priority}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <ButtonTask className="bg-indigo-600">edit</ButtonTask>
          {status ? (
            <ButtonTask className="bg-sky-600">complete</ButtonTask>
          ) : (
            <ButtonTask className="bg-gray-600">incomplete</ButtonTask>
          )}
          <ButtonTask className="bg-red-600">delete</ButtonTask>
        </div>
      </div>
    </>
  )
}

TaskPreview.propTypes = {
  task: PropTypes.object.isRequired,
}

export default TaskPreview
