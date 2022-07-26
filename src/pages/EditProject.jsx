import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { axiosRequest, isEmptyObject } from '../helpers'
import { useProjects } from '../hooks'
import {
  AlertMessage,
  FormCreateProject,
  ProjectHero,
  Spinner,
  SvgDelete,
  SweetAlert,
} from './components'

const EditProject = () => {
  const { id } = useParams()
  const { projects, setProjects } = useProjects()
  const [loading, setLoading] = useState(true)
  const [projectError, setProjectError] = useState(false)
  const [projectDeleted, setProjectDeleted] = useState(false)
  const projectFromStore = useMemo(() => {
    return projects.length > 0
      ? projects.filter((project) => project._id === id)[0]
      : {}
  }, [projects])
  const [project, setProject] = useState(projectFromStore)
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
    setProject(projectFromStore)
  }, [projects])
  useEffect(() => {
    setLoading(false)
    const getProject = async (id) => {
      setLoading(true)
      const [result, error] = await axiosRequest({
        url: `/projects/${id}`,
        method: 'GET',
      })
      if (error) {
        setProjectError(true)
      } else {
        setProject(result.data.project)
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
              <SvgDelete />
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
