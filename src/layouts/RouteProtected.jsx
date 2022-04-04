import { Outlet, Navigate } from 'react-router-dom'

import { useAuth } from '../hooks'

const RouteProtected = () => {
	const { loading, authData: { logged } } = useAuth()
	return loading ? (
		<h2 className="text-center">Loading...</h2>
	) : (
		logged ? (
			<>
				<div>
					<h2>Protected</h2>
					<div>
						<Outlet />
					</div>
				</div>
			</>
		) : (
			<Navigate to="/" />
		)
	)
}

export default RouteProtected
