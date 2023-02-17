import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const RequiresAuth = () => {

    const token = useSelector( state => state.auth.token )

    return (
        token ? <Outlet /> : <Navigate to="/login" replace={true} />
    )
}

export default RequiresAuth