import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

const TaskForm = ({ task = {}, edit = false }) => {
  return (
    <>
      <h2>{edit ? 'Edit task' : 'Add task'}</h2>
    </>
  )
}

TaskForm.propTypes = {
  task: PropTypes.object,
  edit: PropTypes.bool,
}

export default TaskForm
