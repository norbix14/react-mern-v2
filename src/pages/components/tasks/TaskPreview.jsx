import PropTypes from 'prop-types'

import ButtonTask from '../ButtonTask'

import TaskPriorityPill from './TaskPriorityPill'

import SweetAlert from '../helpers/SweetAlert'

import { useModals, useTasks } from '../../../hooks'

import { axiosRequest, prettyDate } from '../../../helpers'

const TaskPreview = ({ task }) => {
  const { handleModalOpen } = useModals()
  const { setEditTask } = useTasks()
  const { _id, name, description, status, timeline, priority, project } = task
  const timelineDate = new Date(timeline).getTime() || 0
  const doAction = async (type) => {
    if (type === 'delete') {
      SweetAlert.Delete({}).then(async (result) => {
        if (result.isConfirmed) {
          SweetAlert.Toast({ title: 'Task deleted' })
        }
      })
    }
  }
  const handleActionType = (type) => {
    const typeLowercase = type.toLowerCase()
    switch (typeLowercase) {
      case 'edit':
        setEditTask(task)
        handleModalOpen(typeLowercase)
        break
      case 'complete':
      case 'incomplete':
      case 'delete':
        doAction(typeLowercase)
        break
      case 'default':
        setEditTask({})
        handleModalOpen('close')
    }
  }
  return (
    <>
      <div className="border-b p-5 flex justify-between items-center">
        <div>
          <p className="mb-1 text-xl">{name}</p>
          <p className="mb-1 text-sm text-gray-500">{description}</p>
          <p className="mb-1 text-sm text-gray-500">
            {prettyDate(timelineDate)}
          </p>
          <div className="flex justify-start gap-2">
            <p className="mb-1 text-gray-600">Priority: </p>
            <TaskPriorityPill priority={priority} />
          </div>
        </div>
        <div className="flex gap-2">
          <ButtonTask
            className="bg-indigo-600"
            onClick={() => handleActionType('edit')}
          >
            edit
          </ButtonTask>
          {status ? (
            <ButtonTask
              className="bg-sky-600"
              onClick={() => handleActionType('complete')}
            >
              complete
            </ButtonTask>
          ) : (
            <ButtonTask
              className="bg-gray-600"
              onClick={() => handleActionType('incomplete')}
            >
              incomplete
            </ButtonTask>
          )}
          <ButtonTask
            className="bg-red-600"
            onClick={() => handleActionType('delete')}
          >
            delete
          </ButtonTask>
        </div>
      </div>
    </>
  )
}

TaskPreview.propTypes = {
  task: PropTypes.object.isRequired,
}

export default TaskPreview
