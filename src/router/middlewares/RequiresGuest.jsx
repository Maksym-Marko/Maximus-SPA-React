import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const RequiresGuest = () => {

    const token = useSelector( state => state.auth.token )

    return (
        ! token ? <Outlet /> : <Navigate to='/dashboard' replace={true} />
    )
}

export default RequiresGuest