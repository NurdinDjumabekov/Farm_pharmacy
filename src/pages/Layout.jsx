import { NavLink, Outlet } from "react-router-dom"
import logo from '../../public/logoW.svg'

const Layout = () =>
{
    return (
        <div className="layout">
            <nav>
                <NavLink to={'/admin'}><img src={logo} alt="logo" /></NavLink>
                <ul>
                    <li><h2>Добро пожаловать на админ панель</h2></li>
                    <li className="btn"><a target="_blank" href="https://www.youtube.com/">Посетить сайт</a></li>
                    <li className="btn leave"><NavLink to={'/'}>Выйти</NavLink></li>
                </ul>
            </nav>
            <div className="outlet"><Outlet /></div>
        </div>
    )
}

export default Layout