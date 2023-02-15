import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const RequiresAuth = () => {

    const user = useSelector( state => state.auth.token )

    console.log( user )

    return (
        user ? <Outlet /> : <Navigate to='/login' replace={true} />
    )
}

export default RequiresAuth