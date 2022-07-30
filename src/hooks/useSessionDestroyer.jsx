import useLocalStorage from './useLocalStorage'
import useAuth from './useAuth'
import useProjects from './useProjects'
import useTasks from './useTasks'

const useSessionDestroyer = () => {
  // clear local storage
  const { 1: setTokenLocalStorage } = useLocalStorage('token')
  const { 1: setUserLocalStorage } = useLocalStorage('user')
  const { 1: setSessionLocalStorage } = useLocalStorage('session')
  // clear context
  const { setAuthData } = useAuth()
  const { setProjects } = useProjects()
  const { setTasks, setEditTask } = useTasks()
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
    setTasks([])
    setEditTask({})
  }
  return [destroySession]
}

export default useSessionDestroyer
