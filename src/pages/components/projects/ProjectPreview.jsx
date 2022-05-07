import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProjectPreview = ({ project }) => {
  const { name, _id, client } = project
  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">
        {name} <span className="text-sm text-gray-500 uppercase">{client}</span>
      </p>
      <Link
        to={`${_id}`}
        className="text-gray-600 uppercase text-sm font-bold hover:text-gray-800"
        title={`Project #${_id}`}
      >
        See more
      </Link>
    </div>
  )
}

ProjectPreview.propTypes = {
  project: PropTypes.object.isRequired,
}

export default ProjectPreview
