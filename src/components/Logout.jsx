import { useDispatch } from "react-redux"
import { logOut } from "@/features/auth/authSlice"
import { useEffect } from "react"

const Logout = () => {

    const dispatch = useDispatch()
    
    useEffect( () => {
        dispatch( logOut() )
    },[] )    
    
    return (
        <>Logout</>
    )
}

export default Logout