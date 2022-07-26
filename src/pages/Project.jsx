import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { axiosRequest, isEmptyObject } from '../helpers'
import { useProjects, useModals, useTasks } from '../hooks'
import {
  AlertMessage,
  ProjectHero,
  Spinner,
  ModalTaskForm,
  SvgEdit,
  SvgPlus,
  TaskPreview,
} from './components'

const Project = () => {
  const { id } = useParams()
  const { setProjects } = useProjects()
  const { handleModalOpen } = useModals()
  const { tasks, setTasks } = useTasks()
  const [loading, setLoading] = useState(true)
  const [projectError, setProjectError] = useState(false)
  const [project, setProject] = useState({})
  useEffect(() => {
    const getProject = async (id) => {
      const [result, error] = await axiosRequest({
        url: `/projects/${id}`,
        method: 'GET',
      })
      if (error) {
        setProjectError(true)
      } else {
        setProject(result.data.project)
        setTasks(result.data.project.tasks)
        setProjects((prev) => {
          if (!prev || isEmptyObject(prev)) {
            return [...prev, result.data.project]
          }
          return prev.map((p) => {
            if (p._id === id) {
              return result.data.project
            }
            return p
          })
        })
      }
      setLoading(false)
    }
    if (!project || isEmptyObject(project)) {
      getProject(id)
    }
  }, [])
  return (
    <>
      {projectError ? (
        <AlertMessage
          alert={{ error: true, message: 'Something bad happened' }}
        />
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <ProjectHero project={project} />
          <div className="flex justify-between">
            <h2 className="font-black text-4xl">{project.name}</h2>
            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
              <SvgEdit />
              <Link
                className="uppercase font-bold"
                to={`/projects/edit/${id}`}
                title={`Edit project #${id}`}
              >
                edit
              </Link>
            </div>
          </div>
          <button
            type="button"
            className="
              text-sm px-5 py-3 w-full md:w-auto rounded-lg 
              uppercase font-bold bg-sky-400 text-white 
              text-center mt-5 flex gap-2 items-center justify-center
            "
            title={`Add task to project #${id}`}
            onClick={() => handleModalOpen('add')}
          >
            <SvgPlus />
            add task
          </button>
          <ModalTaskForm />
          <div className="mt-10 bg-white rounded-lg shadow">
            {tasks.length > 0 ? (
              tasks.map((task) => <TaskPreview task={task} key={task._id} />)
            ) : (
              <p className="text-center text-gray-500 my-5 p-10">
                No tasks yet
              </p>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Project
