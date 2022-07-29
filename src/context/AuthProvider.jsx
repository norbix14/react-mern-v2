import { useState, useEffect, useMemo, createContext } from 'react'

import { useLocation } from 'react-router-dom'

import { axiosRequest } from '../helpers'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [authData, setAuthData] = useState({
    logged: false,
    token: null,
    user: {},
    session: {},
  })
  const memoizedStorage = useMemo(() => {
    return {
      token: JSON.parse(window.localStorage.getItem('token')),
      user: JSON.parse(window.localStorage.getItem('user')),
      session: JSON.parse(window.localStorage.getItem('session')),
    }
  }, [authData.logged])
  const location = useLocation()
  useEffect(() => {
    const authentication = async (_token, _user, _session) => {
      if (!_token) {
        setLoading(false)
        return
      } else {
        if (_user) {
          setAuthData({
            logged: true,
            token: _token,
            user: _user,
            session: _session,
          })
        } else {
          const [result, error] = await axiosRequest({
            url: '/users/profile',
            method: 'GET',
          })
          if (error) {
            setAuthData({
              logged: false,
              token: null,
              user: {},
              session: {},
            })
          } else {
            const {
              data: { token, user, session },
            } = result
            const userData = {
              _id: user._id,
              name: user.name,
              email: user.email,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            }
            setAuthData({
              logged: true,
              token,
              user: userData,
              session,
            })
            window.localStorage.setItem('user', JSON.stringify(userData))
            window.localStorage.setItem('token', JSON.stringify(token))
            window.localStorage.setItem('session', JSON.stringify(session))
          }
        }
      }
      setLoading(false)
    }
    authentication(
      memoizedStorage.token,
      memoizedStorage.user,
      memoizedStorage.session
    )
  }, [])
  useEffect(() => {
    if (memoizedStorage) {
      if (!memoizedStorage.session) {
        setAuthData((prev) => ({
          ...prev,
          session: {},
        }))
      } else {
        if (Object.keys(memoizedStorage.session).length > 0) {
          const { creation, expiration } = memoizedStorage.session
          setAuthData((prev) => ({
            ...prev,
            session: {
              ...prev.session,
              creation: Number(creation),
              expiration: Number(expiration),
            },
          }))
        }
      }
    }
  }, [location])
  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext
