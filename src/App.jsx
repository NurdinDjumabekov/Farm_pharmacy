import { Route, Routes } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import AdminPage from './pages/AdminPage'
import SaleModerator from './pages/SaleModerator'
import ReceipModerator from './pages/ReceipModerator'
import './sass/app.sass';
function App()
{
  return (
    <Routes>
      <Route path='/' element={<IntroPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/salemoder' element={<SaleModerator />} />
      <Route path='/reciepmoder' element={<ReceipModerator />} />
    </Routes>
  )
}

export default App
