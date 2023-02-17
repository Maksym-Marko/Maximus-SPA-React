import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const RequiresEmailVerification = () => {

    const user = useSelector( state => state.auth.user )

    return (
        user?.emailVerifiedAt ? <Outlet /> : <Navigate to="/verify-email" replace={true} />
    )

}

export default RequiresEmailVerification