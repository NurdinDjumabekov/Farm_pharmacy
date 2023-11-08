import { useEffect, useState } from "react"
import AuthForm from "../components/AuthForm"
import logo from '../../public/logo.png'
const IntroPage = () =>
{
    const [openModal, setOpenModal] = useState(false)
    useEffect(() =>
    {
        openModal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = ''
    }, [openModal])
    return (
        <div>
            <div><img src={logo} alt="logo" /></div>
            <h1>NUSKA ADMIN PANEL</h1>
            <h2>Войти как:</h2>
            <div>
                <button onClick={() => setOpenModal(true)}>Модератор по продажам</button>
                <button onClick={() => setOpenModal(true)}>АДМИН</button>
                <button onClick={() => setOpenModal(true)}>Модератор по поступлениям</button>
            </div>
            {openModal && <AuthForm closeModal={setOpenModal} />}
        </div>
    )
}

export default IntroPage