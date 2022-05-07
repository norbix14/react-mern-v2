import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Input, InputSubmit, AlertMessage } from './components'

import { useHandlerInputChange } from '../hooks'

import { isAnyEmptyValue, isValidValueLength, axiosRequest } from '../helpers'

const NewPassword = () => {
  const initialStateForm = {
    password: '',
  }
  const initialStateAlert = {
    error: false,
    message: '',
  }
  const { token } = useParams()
  const [values, handleChange, reset] = useHandlerInputChange(initialStateForm)
  const [alertData, setAlertData] = useState(initialStateAlert)
  const [passwordRestablished, setPasswordRestablished] = useState(false)
  const [checkingToken, setCheckingToken] = useState(true)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [validToken, setValidToken] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtnDisabled(true)
    try {
      if (isAnyEmptyValue(values)) {
        throw new Error('The new password is required')
      }
      if (!isValidValueLength(values.password)) {
        throw new Error('The password is too short')
      }
      const [result, error] = await axiosRequest({
        url: `/users/forgot/${token}`,
        method: 'POST',
        data: values,
      })
      if (error) {
        throw new Error(error.response.data.msg)
      } else {
        setPasswordRestablished(true)
        setAlertData({
          error: false,
          message: result.data.msg,
        })
        reset()
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
    const checkToken = async (_token) => {
      try {
        const [result, error] = await axiosRequest({
          url: `/users/forgot/${_token}`,
          method: 'GET',
        })
        if (error) {
          setValidToken(false)
          throw new Error(error.response.data.msg)
        } else {
          setValidToken(true)
        }
      } catch (error) {
        setAlertData({
          error: true,
          message: error.message || 'Something bad happened',
        })
      } finally {
        setCheckingToken(false)
      }
    }
    checkToken(token)
  }, [])
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reset password and check your{' '}
        <span className="text-slate-700">projects</span>
      </h1>
      {checkingToken ? (
        <AlertMessage alert={{ error: false, message: 'Checking token...' }} />
      ) : validToken ? (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <Input
            id="password"
            label="New password"
            placeholder="New password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          <InputSubmit value="Reset password" disabled={btnDisabled} />
          {passwordRestablished ? (
            <>
              <AlertMessage alert={alertData} />
              <Link
                className="
												block text-center my-5 text-slate-700 uppercase 
												text-sm
											"
                to="/"
              >
                Great! Now, try to log into your account
              </Link>
            </>
          ) : (
            alertData.error && <AlertMessage alert={alertData} />
          )}
        </form>
      ) : (
        <AlertMessage alert={alertData} />
      )}
    </>
  )
}

export default NewPassword
