import { createContext, useState } from 'react'

const TasksContext = createContext()

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [editTask, setEditTask] = useState({})
  return (
    <TasksContext.Provider
      value={{
        editTask,
        tasks,
        setEditTask,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export { TasksProvider }

export default TasksContext
