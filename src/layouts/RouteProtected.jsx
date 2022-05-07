import { Outlet, Navigate } from 'react-router-dom'

import { useAuth } from '../hooks'
import { Header, Sidebar } from '../components'

const RouteProtected = () => {
  const {
    loading,
    authData: { logged },
  } = useAuth()
  return loading ? (
    <h2 className="text-center">Loading...</h2>
  ) : logged ? (
    <>
      <div className="bg-gray-100">
        <Header />
        <div className="md:flex md:min-h-screen">
          <Sidebar />
          <main className="flex-1 p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/" />
  )
}

export default RouteProtected
