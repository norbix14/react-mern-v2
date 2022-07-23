import { useEffect, useState } from 'react'

import { useProjects, useTasks } from '../hooks'

import { axiosRequest } from '../helpers'

import { AlertMessage, ProjectPreview } from './components'

const Projects = () => {
  const [projectError, setProjectError] = useState(false)
  const { projects, setProjects } = useProjects()
  const { setTasks } = useTasks()
  useEffect(() => {
    const getAllProjects = async () => {
      const [result, error] = await axiosRequest({
        url: '/projects/all',
        method: 'GET',
      })
      if (error) {
        setProjectError(true)
      } else {
        setProjects(result.data.projects)
      }
    }
    setTasks([])
    getAllProjects()
  }, [])
  return (
    <>
      <h2 className="text-4xl font-black text-center">All Projects</h2>
      <h3 className="text-3xl font-black text-center my-5">
        {projects.length > 0
          ? 'Projects: ' + projects.length
          : 'You do not have projects yet'}
      </h3>
      {projectError ? (
        <AlertMessage
          alert={{
            error: true,
            message: 'Something bad happened',
          }}
        />
      ) : (
        <>
          {projects.map((project) => (
            <ProjectPreview key={project._id} project={project} />
          ))}
        </>
      )}
    </>
  )
}

export default Projects
