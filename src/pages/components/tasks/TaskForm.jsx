import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import AlertMessage from '../AlertMessage'
import Input from '../Input'
import InputSubmit from '../InputSubmit'
import Select from '../Select'
import Textarea from '../Textarea'

import SweetAlert from '../helpers/SweetAlert'

import { useHandlerInputChange, useModals, useTasks } from '../../../hooks'

import { axiosRequest, isAnyEmptyValue } from '../../../helpers'

let alertTimeout
const initialStateTask = {
  name: '',
  description: '',
  timeline: '',
  priority: '',
}
const initialStateAlert = {
  error: false,
  message: '',
}
const inputs = [
  {
    id: 'name',
    key: 1,
    label: 'Name',
    placeholder: 'Name',
    type: 'text',
    required: true,
  },
  {
    id: 'timeline',
    key: 2,
    label: 'Timeline',
    placeholder: 'Timeline',
    type: 'date',
    required: true,
  },
]
const PRIORITIES = [
  {
    id: 'low',
    label: 'Low',
    enum: 'Low',
    key: 1,
  },
  {
    id: 'medium',
    label: 'Medium',
    enum: 'Medium',
    key: 2,
  },
  {
    id: 'high',
    label: 'High',
    enum: 'High',
    key: 3,
  },
]

const TaskForm = () => {
  const [alertData, setAlertData] = useState(initialStateAlert)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [taskCreated, setTaskCreated] = useState(false)
  const { id } = useParams()
  const { modalType, handleModalOpen } = useModals()
  const { editTask, setEditTask, setTasks } = useTasks()
  const isEdit = modalType === 'edit'
  const [values, handleChange, reset] = useHandlerInputChange(
    isEdit
      ? {
          ...editTask,
          timeline: editTask.timeline.split('T')[0],
        }
      : initialStateTask
  )
  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtnDisabled(true)
    try {
      if (isAnyEmptyValue(values)) {
        throw new Error('All fields are required')
      }
      const [result, error] = await axiosRequest({
        url: isEdit ? `/tasks/update/${values._id}` : '/tasks/create',
        method: isEdit ? 'PUT' : 'POST',
        data: {
          ...values,
          project: id,
        },
      })
      if (error) {
        throw new Error(error.response.data.msg)
      } else {
        const {
          data: { msg, task },
        } = result
        reset()
        setAlertData({
          error: false,
          message: msg,
        })
        setTaskCreated(true)
        setTasks((prev) => {
          return isEdit
            ? prev.map((t) => (t._id === task._id ? task : t))
            : [...prev, { ...task }]
        })
        if (isEdit) {
          handleModalOpen('close')
          setEditTask({})
          SweetAlert.Toast({ title: msg })
        }
        alertTimeout = setTimeout(() => setTaskCreated(false), 3000)
      }
    } catch (error) {
      setAlertData({
        error: true,
        message: error.message || 'Something went wrong',
      })
    } finally {
      setBtnDisabled(false)
    }
  }
  useEffect(() => {
    return () => {
      clearTimeout(alertTimeout)
    }
  }, [])
  return (
    <>
      <h2>{isEdit ? 'Edit task' : 'Add task'}</h2>
      <form className="my-10" onSubmit={handleSubmit}>
        {inputs.map(({ id, key, label, placeholder, type, required }) => (
          <Input
            key={key}
            id={id}
            label={label}
            placeholder={placeholder}
            type={type}
            required={required}
            value={values[id]}
            onChange={handleChange}
          />
        ))}
        <Textarea
          id="description"
          label="Description"
          onChange={handleChange}
          placeholder="Description"
          required={true}
          value={values.description}
        />
        <Select
          id="priority"
          label="Priority"
          onChange={handleChange}
          placeholder="Priority"
          required={true}
          value={values.priority}
          options={PRIORITIES}
        />
        <InputSubmit
          value={isEdit ? 'update' : 'create'}
          disabled={btnDisabled}
        />
      </form>
      {taskCreated && <AlertMessage alert={alertData} />}
      {alertData.error && <AlertMessage alert={alertData} />}
    </>
  )
}

export default TaskForm
