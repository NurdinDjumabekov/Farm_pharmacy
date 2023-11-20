import { useEffect, useState } from "react"
import AuthForm from "../components/AuthForm"
import logo from '../../public/logo.svg'
import montins from '../assets/images/pages/montins.png'
import lock from '../assets/images/pages/lock_icon.svg'
import mail from '../assets/images/pages/mail_icon.svg'
import { useNavigate } from "react-router-dom"

const IntroPage = () =>
{
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const submitHandler = (e) =>
    {
        e.preventDefault()
        if (login === 'admin@gmail.com' && password === 'admin') navigate('/admin')
        else if (login === 'seller@gmail.com' && password === 'seller') navigate('/salemoder')
        else if (login === 'reciep@gmail.com' && password === 'reciep') navigate('/reciepmoder')
        else return setError(true)
    }

    return (
        <div className="introPage">
            <div className="left">
                <h1>Admin панель</h1>
                <div className="logo"><img src={logo} alt="logo" /></div>
                <div className="mountins"><img src={montins} alt="img" /></div>
            </div>
            <div className="right">
                <h2>Вход</h2>
                <form onSubmit={submitHandler}>
                    <div className="inputBlock">
                        <label><img src={mail} alt="img" /><span>Email address</span></label>
                        <input value={login} onChange={e => setLogin(e.target.value)} type="email" placeholder="example@gmail.com" />
                    </div>
                    <div className="inputBlock">
                        <label><img src={lock} alt="img" /><span>Password</span></label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    </div>
                    {error && <p className="error">Неправильный логин или пароль</p>}
                    <button>Войти</button>
                </form>
            </div>
        </div>
    )
}

export default IntroPage