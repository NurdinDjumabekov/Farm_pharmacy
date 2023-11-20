import { Route, Routes } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import AdminPage from './pages/AdminPage'
import BooksPage from './pages/Admin/Books'
import UsersPage from './pages/Admin/Users'
import OrdersPage from './pages/Admin/Orders'
import SaleModerator from './pages/SaleModerator'
import ReceipModerator from './pages/ReceipModerator'
import './sass/app.sass';
import { useEffect } from 'react'
import axios from 'axios'
import Layout from './pages/Layout'
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
      <Route path='/admin' element={<Layout />} >
        <Route index element={<AdminPage />} />
        <Route path='/admin/users' element={<UsersPage />} />
        <Route path='/admin/books' element={<BooksPage />} />
        <Route path='/admin/orders' element={<OrdersPage />} />
      </Route>
      <Route path='/salemoder' element={<SaleModerator />} />
      <Route path='/reciepmoder' element={<ReceipModerator />} />
    </Routes>
  )
}

export default App
