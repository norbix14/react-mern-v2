import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

import { useHandlerInputChange } from '../../../hooks'
import Input from '../Input'
import InputSubmit from '../InputSubmit'
import Textarea from '../Textarea'
import Select from '../Select'

const TaskForm = ({ task = {}, edit = false }) => {
  const initialState = {
    name: '',
    description: '',
    priority: '',
  }
  const [values, handleChange] = useHandlerInputChange(
    edit ? task : initialState
  )
  const inputsText = useMemo(() => {
    return [
      {
        id: 'name',
        key: 1,
        label: 'Name',
        placeholder: 'Name',
        type: 'text',
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
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
  }
  return (
    <>
      {/* <h2>{edit ? 'Edit task' : 'Add task'}</h2> */}
      <form className="my-10" onSubmit={handleSubmit}>
        {inputsText.map(({ id, key, label, placeholder, type, required }) => (
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
        <InputSubmit value="Add task" disabled={false} />
      </form>
    </>
  )
}

TaskForm.propTypes = {
  task: PropTypes.object,
  edit: PropTypes.bool,
}

export default TaskForm
