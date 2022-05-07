import { Link } from 'react-router-dom'

import { useSessionDestroyer } from '../hooks'

const Header = () => {
  const [destroySession] = useSessionDestroyer()
  const handleLogout = () => destroySession()
  return (
    <header
      className="
				px-4 py-5 bg-white border-b
			"
    >
      <div className="md:flex md:justify-between">
        <h2 className="text-4l text-sky-600 font-black text-center">Uptask</h2>
        <input
          className="rounder-lg lg:w-96 block p-2 border"
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
        />
        <div className="flex items-center gap-4">
          <Link className="font-bold uppercase" to="/projects">
            Projects
          </Link>
          <button
            className="
							text-white text-sm bg-sky-600 
							p-3 rounded-md uppercase font-bold 
						"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
