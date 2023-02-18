import VerificationEmailForm from "@/components/VerificationEmailForm"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const VerifyEmail = () => {

    const user = useSelector( state => state.auth.user )

    return ( ( user?.emailVerifiedAt ) ?
        <Navigate to="/dashboard" replace={true} /> :
        <VerificationEmailForm />
    )

}

export default VerifyEmail