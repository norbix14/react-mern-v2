import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Auth from './layouts/Auth'
import {
  Login,
  Register,
  ForgotPassword,
  NewPassword,
  AccountConfirmation
} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} >
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="forgotpassword/:token" element={<NewPassword />} />
          <Route path="confirm/:id" element={<AccountConfirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
