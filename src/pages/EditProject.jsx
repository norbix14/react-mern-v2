import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { axiosRequest } from '../helpers'
import { useProjects } from '../hooks'
import {
  AlertMessage,
  FormCreateProject,
  ProjectHero,
  Spinner,
  SweetAlert,
} from './components'

const EditProject = () => {
  const { id } = useParams()
  const { projects, setProjects } = useProjects()
  const [loading, setLoading] = useState(true)
  const [projectError, setProjectError] = useState(false)
  const [projectDeleted, setProjectDeleted] = useState(false)
  const projectFromStore = useMemo(() => {
    return projects.filter((project) => project._id === id)
  }, [projects])
  const [project, setProject] = useState({})
  const handleClickDelete = () => {
    SweetAlert.Delete({}).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true)
        const [result, error] = await axiosRequest({
          url: `/projects/delete/${id}`,
          method: 'DELETE',
        })
        if (error) {
          setProjectError(true)
        } else {
          setProjects((prev) => prev.filter((p) => p._id !== id))
          setProjectDeleted(true)
          SweetAlert.Toast({ title: result.data.msg })
        }
      }
    })
    setLoading(false)
  }
  useEffect(() => {
    setProject(projectFromStore.length > 0 ? projectFromStore[0] : {})
  }, [projects])
  useEffect(() => {
    const getProject = async (id) => {
      const [result, error] = await axiosRequest({
        url: `/projects/${id}`,
        method: 'GET',
      })
      if (error) {
        setProjectError(true)
      } else {
        setProject(result.data.project.project)
      }
    }
    if (!project || Object.keys(project).length <= 0) {
      getProject(id)
    }
    setLoading(false)
  }, [])
  return (
    <>
      {projectDeleted ? (
        <h3 className="uppercase font-bold">project deleted</h3>
      ) : projectError ? (
        <AlertMessage
          alert={{ error: true, message: 'Something bad happened' }}
        />
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <ProjectHero project={project} />
          <div className="flex justify-between">
            <h2 className="font-black text-4xl">
              <span className="text-gray-500">Edit</span> {project.name}
            </h2>
            <div className="flex items-center gap-2 text-red-400 hover:text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <button
                type="button"
                className="uppercase font-bold"
                title={`Delete project #${id}`}
                onClick={handleClickDelete}
              >
                delete
              </button>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <FormCreateProject project={project} edit={true} />
          </div>
        </>
      )}
    </>
  )
}

export default EditProject
