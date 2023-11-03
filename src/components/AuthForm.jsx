import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthForm = ({ closeModal }) =>
{
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        document.body.style.overflow = ''
        if (login === 'admin' && password === 'admin') navigate('/admin')
        else if (login === 'seller' && password === 'seller') navigate('/salemoder')
        else if (login === 'reciep' && password === 'reciep') navigate('/reciepmoder')
        else return setError(true)
        closeModal(false)
    }
    return (
        <div onClick={() => closeModal(false)} className='window'>
            <div onClick={(e) => e.stopPropagation()} className='content'>
                <h2>Для входа введите логин и пароль</h2>
                <form onSubmit={handleSubmit}>
                    <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    <button>Войти</button>
                </form>
                <button className="close" onClick={() => closeModal(false)}>x</button>
                {error && <p className="error">Неправильный логин или пароль</p>}
            </div>
        </div>
    )
}

export default AuthForm