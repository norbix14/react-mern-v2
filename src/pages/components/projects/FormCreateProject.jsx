import { useMemo, useState, useEffect } from 'react'

import Input from '../Input'
import InputSubmit from '../InputSubmit'
import Textarea from '../Textarea'
import AlertMessage from '../AlertMessage'

import { useHandlerInputChange, useProjects } from '../../../hooks'

import { axiosRequest, isAnyEmptyValue } from '../../../helpers'

const FormCreateProject = () => {
  const initialStateForm = {
    name: '',
    description: '',
    timeline: '',
    client: '',
  }
  const initialStateAlert = {
    error: false,
    message: '',
  }
  const [values, handleChange, reset] = useHandlerInputChange(initialStateForm)
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
      if (isAnyEmptyValue(values)) {
        throw new Error('All fields are required')
      }
      const [result, error] = await axiosRequest({
        url: '/projects/create',
        method: 'POST',
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
        reset()
        setAlertData({
          error: false,
          message: msg,
        })
        setProjectCreated(true)
        setProjects((prev) => {
          return [
            ...prev,
            {
              ...project,
            },
          ]
        })
        alertTimeout = setTimeout(() => {
          setProjectCreated(false)
        }, 4000)
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
        <InputSubmit value="Create" disabled={btnDisabled} />
        {projectCreated && <AlertMessage alert={alertData} />}
        {alertData.error && <AlertMessage alert={alertData} />}
      </form>
    </>
  )
}

export default FormCreateProject
