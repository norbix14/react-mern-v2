import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { axiosRequest } from '../helpers'
import { useProjects } from '../hooks'
import { AlertMessage, ProjectHero, Spinner } from './components'

const Project = () => {
  const { id } = useParams()
  const { projects } = useProjects()
  const [loading, setLoading] = useState(true)
  const [projectError, setProjectError] = useState(false)
  const projectFromStore = useMemo(() => {
    return projects.filter((project) => project._id === id)
  }, [])
  const [project, setProject] = useState(
    projectFromStore.length > 0 ? projectFromStore[0] : {}
  )
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <Link
                className="uppercase font-bold"
                to={`/projects/edit/${id}`}
                title={`Edit project #${id}`}
              >
                edit
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Project
