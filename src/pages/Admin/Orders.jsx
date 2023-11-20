import { useNavigate } from "react-router-dom"


const Orders = () =>
{
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate(-1)}>Назад</button>
            Orders page
        </div>
    )
}

export default Orders