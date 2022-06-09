import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthProvider'
import { ProjectsProvider } from './context/ProjectsProvider'
import { TasksProvider } from './context/TasksProvider'
import { ModalProvider } from './context/ModalProvider'

import Auth from './layouts/Auth'
import RouteProtected from './layouts/RouteProtected'

import {
  Login,
  Register,
  ForgotPassword,
  NewPassword,
  AccountConfirmation,
  Projects,
  Project,
  CreateProject,
  EditProject,
} from './pages'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
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
                <Route path=":id" element={<Project />} />
                <Route path="create" element={<CreateProject />} />
                <Route path="edit/:id" element={<EditProject />} />
              </Route>
            </Routes>
          </ProjectsProvider>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
