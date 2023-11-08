import { Route, Routes } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import AdminPage from './pages/AdminPage'
import SaleModerator from './pages/SaleModerator'
import ReceipModerator from './pages/ReceipModerator'
import './sass/app.sass';
import { useEffect } from 'react'
import axios from 'axios'
function App()
{
  const getUse = async () =>
  {

    const data = await axios({
      method: "GET",
      url: "https://gulbarakadyrovna.pythonanywhere.com/api/user_list/",
      // headers: {
      //   Authorization: "Basic 82b0212307ffc579dcf1f37e37b0945dc6c9b56c"
      // }
    })
    console.log(data, "resp");
  }
  useEffect(() =>
  {
    getUse()
  }, [])
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
