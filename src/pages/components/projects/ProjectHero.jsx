import PropTypes from 'prop-types'

import { prettyDate, timeAgo } from '../../../helpers'

const ProjectHero = ({ project }) => {
  const { _id, createdAt, updatedAt } = project

  const creationDate = new Date(createdAt).getTime() || 0
  const lastUpdateDate = new Date(updatedAt).getTime() || 0

  return (
    <div className="p-4 bg-white rounded-lg shadow-m mb-2">
      <p>
        <span className="text-gray-500">Project</span> #{_id}
      </p>
      <p>
        <span className="text-gray-500">Created </span>
        {timeAgo(creationDate, 'en')}
      </p>
      <p>
        <span className="text-gray-500">Date of creation: </span>
        {prettyDate(creationDate)}
      </p>
      <p>
        <span className="text-gray-500">Last update: </span>
        {timeAgo(lastUpdateDate, 'en')}
      </p>
    </div>
  )
}

ProjectHero.propTypes = {
  project: PropTypes.object.isRequired,
}

export default ProjectHero
