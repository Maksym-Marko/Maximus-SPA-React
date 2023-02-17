import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const RequiresGuest = () => {

    const user = useSelector( state => state.auth.token )

    return (
        ! user ? <Outlet /> : <Navigate to='/' replace={true} />
    )
}

export default RequiresGuest