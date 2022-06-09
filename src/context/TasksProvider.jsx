import { createContext, useState } from 'react'

const TasksContext = createContext()

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export { TasksProvider }

export default TasksContext
