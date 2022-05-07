import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthProvider'
import { ProjectsProvider } from './context/ProjectsProvider'

import Auth from './layouts/Auth'
import RouteProtected from './layouts/RouteProtected'

import {
  Login,
  Register,
  ForgotPassword,
  NewPassword,
  AccountConfirmation,
  Projects,
  CreateProject,
  Project,
} from './pages'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<Auth />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgotpassword" element={<ForgotPassword />} />
              <Route path="forgotpassword/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<AccountConfirmation />} />
            </Route>
            <Route path="/projects" element={<RouteProtected />}>
              <Route index element={<Projects />} />
              <Route path="create" element={<CreateProject />} />
              <Route path=":id" element={<Project />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
