import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import AlertMessage from '../AlertMessage'
import Input from '../Input'
import InputSubmit from '../InputSubmit'
import Select from '../Select'
import Textarea from '../Textarea'

import { axiosRequest, isAnyEmptyValue } from '../../../helpers'
import { useHandlerInputChange, useTasks } from '../../../hooks'

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

const TaskForm = ({ task = {}, edit = false }) => {
  const { id } = useParams()
  const [values, handleChange, reset] = useHandlerInputChange(
    edit ? task : initialStateTask
  )
  const [alertData, setAlertData] = useState(initialStateAlert)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [taskCreated, setTaskCreated] = useState(false)
  const inputs = useMemo(() => {
    return [
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
  }, [])
  const PRIORITIES = useMemo(() => {
    return [
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
  }, [])
  const { setTasks } = useTasks()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtnDisabled(true)
    try {
      if (isAnyEmptyValue(values)) {
        throw new Error('All fields are required')
      }
      const [result, error] = await axiosRequest({
        url: edit ? `/tasks/update/${values._id}` : '/tasks/create',
        method: edit ? 'PUT' : 'POST',
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
          let res = []
          if (edit) {
            res = prev.map((t) => (t._id === task._id ? task : t))
          } else {
            res = [...prev, { ...task }]
          }
          return res
        })
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
      {/* <h2>{edit ? 'Edit task' : 'Add task'}</h2> */}
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
          value={edit ? 'update' : 'create'}
          disabled={btnDisabled}
        />
      </form>
      {taskCreated && <AlertMessage alert={alertData} />}
      {alertData.error && <AlertMessage alert={alertData} />}
    </>
  )
}

TaskForm.propTypes = {
  task: PropTypes.object,
  edit: PropTypes.bool,
}

export default TaskForm
