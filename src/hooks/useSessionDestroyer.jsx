import useLocalStorage from './useLocalStorage'
import useAuth from './useAuth'
import useProjects from './useProjects'

const useSessionDestroyer = () => {
  // clear local storage
  const { 1: setTokenLocalStorage } = useLocalStorage('token')
  const { 1: setUserLocalStorage } = useLocalStorage('user')
  const { 1: setSessionLocalStorage } = useLocalStorage('session')
  // clear context
  const { setAuthData } = useAuth()
  const { setProjects } = useProjects()
  // function to use to clear the data
  const destroySession = () => {
    setTokenLocalStorage('')
    setUserLocalStorage({})
    setSessionLocalStorage({})
    setAuthData({
      logged: false,
      token: null,
      user: {},
      session: {},
    })
    setProjects([])
  }
  return [destroySession]
}

export default useSessionDestroyer
