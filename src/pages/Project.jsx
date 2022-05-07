import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { timeAgo, prettyDate, axiosRequest } from '../helpers'
import { useProjects } from '../hooks'
import { AlertMessage } from './components'

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
    const getAllProjects = async (id) => {
      const [result, error] = await axiosRequest({
        url: `/projects/${id}`,
        method: 'GET',
      })
      if (error) {
        setProjectError(true)
      } else {
        setProject(result.data.project)
      }
    }
    if (!project || Object.keys(project).length <= 0) {
      getAllProjects(id)
    }
    setLoading(false)
  })
  return (
    <>
      {projectError ? (
        <AlertMessage
          alert={{ error: true, message: 'Something bad happened' }}
        />
      ) : loading ? (
        <p>cargando...</p>
      ) : (
        <>
          <p>Project #{id}</p>
          <p>
            Created {timeAgo(new Date(project.createdAt).getTime() || 0, 'en')}
          </p>
          <p>
            Date of creation: {prettyDate(new Date(project.createdAt).getTime() || 0)}
          </p>
        </>
      )}
    </>
  )
}

export default Project
