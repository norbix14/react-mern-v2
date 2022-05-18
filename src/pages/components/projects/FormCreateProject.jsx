import PropTypes from 'prop-types'
import { useMemo, useState, useEffect } from 'react'

import Input from '../Input'
import InputSubmit from '../InputSubmit'
import Textarea from '../Textarea'
import AlertMessage from '../AlertMessage'

import { useHandlerInputChange, useProjects } from '../../../hooks'

import { axiosRequest, isAnyEmptyValue } from '../../../helpers'

const FormCreateProject = ({ project = {}, edit = false }) => {
  const emptyState = {
    name: '',
    description: '',
    timeline: '',
    client: '',
  }
  const initialStateForm =
    Object.keys(project).length > 0
      ? { ...project, timeline: project.timeline.split('T')[0] }
      : emptyState
  const initialStateAlert = {
    error: false,
    message: '',
  }
  const {
    0: values,
    1: handleChange,
    3: setValues,
  } = useHandlerInputChange(initialStateForm)
  const [alertData, setAlertData] = useState(initialStateAlert)
  const [projectCreated, setProjectCreated] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const { setProjects } = useProjects()
  let alertTimeout
  const inputs = useMemo(() => {
    return [
      {
        id: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Project name',
        key: 1,
      },
      {
        id: 'timeline',
        label: 'Timeline',
        type: 'date',
        placeholder: 'Project timeline',
        key: 2,
      },
      {
        id: 'client',
        label: 'Client',
        type: 'text',
        placeholder: 'Project client',
        key: 3,
      },
    ]
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtnDisabled(true)
    try {
      let url, method
      const fieldsToCheck = {
        name: values.name,
        description: values.description,
        timeline: values.timeline,
        client: values.client,
      }
      if (isAnyEmptyValue(fieldsToCheck)) {
        throw new Error('All fields are required')
      }
      if (edit) {
        url = `/projects/update/${values._id}`
        method = 'PUT'
      } else {
        url = '/projects/create'
        method = 'POST'
      }
      const [result, error] = await axiosRequest({
        url,
        method,
        data: {
          ...values,
          timeline: new Date(values.timeline),
        },
      })
      if (error) {
        throw new Error(error.response.data.msg)
      } else {
        const {
          data: { msg, project },
        } = result
        setValues(emptyState)
        setAlertData({
          error: false,
          message: msg,
        })
        setProjectCreated(true)
        setProjects((prev) => {
          let res = []
          if (edit) {
            res = prev.map((p) => (p._id === project._id ? project : p))
          } else {
            res = [...prev, { ...project }]
          }
          return res
        })
        alertTimeout = setTimeout(() => setProjectCreated(false), 4000)
      }
    } catch (error) {
      setAlertData({
        error: true,
        message: error.message || 'Something bad happened',
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
      <form
        className="
					bg-white py-10 px-5 rounded-lg shadow
					sm:w-full xl:w-1/2
				"
        onSubmit={handleSubmit}
      >
        {inputs.map(({ id, label, type, placeholder, key }) => (
          <Input
            key={key}
            id={id}
            label={label}
            type={type}
            placeholder={placeholder}
            value={values[id]}
            onChange={handleChange}
          />
        ))}
        <Textarea
          id="description"
          label="Description"
          placeholder="Project description"
          value={values.description}
          onChange={handleChange}
        />
        <InputSubmit
          value={edit ? 'update' : 'create'}
          disabled={btnDisabled}
        />
        {projectCreated && <AlertMessage alert={alertData} />}
        {alertData.error && <AlertMessage alert={alertData} />}
      </form>
    </>
  )
}

FormCreateProject.propTypes = {
  project: PropTypes.object,
  edit: PropTypes.bool,
}

export default FormCreateProject
