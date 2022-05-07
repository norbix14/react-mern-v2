import { Link } from 'react-router-dom'

import { useAuth } from '../hooks'

import Session from './Session'

const Sidebar = () => {
  const {
    authData: { user },
    loading,
  } = useAuth()
  return (
    <aside className="relative md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold">Hello {user.name}!</p>
      <Link
        className="
					bg-sky-600 w-full p-3 text-white uppercase block
					font-bold mt-5 text-center rounded-lg
				"
        to="create"
      >
        New project
      </Link>
      {!loading && <Session />}
    </aside>
  )
}

export default Sidebar
