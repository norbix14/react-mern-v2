import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthProvider.jsx'
import Auth from './layouts/Auth'
import RouteProtected from './layouts/RouteProtected'
import {
  Login,
  Register,
  ForgotPassword,
  NewPassword,
  AccountConfirmation,
  Projects
} from './pages'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Auth />} >
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="forgotpassword/:token" element={<NewPassword />} />
            <Route path="confirm/:id" element={<AccountConfirmation />} />
          </Route>
          <Route path="/projects" element={<RouteProtected />} >
            <Route index element={<Projects />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
