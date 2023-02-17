import { Outlet } from "react-router-dom"
import Navigation from "@/components/Navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetUserQuery } from "@/services/Auth"
import { setUser, logOut } from "@/store/slices/auth/authSlice"
import FlashMessages from "./FlashMessages"

const DefaultLayout = () => {

    const dispatch = useDispatch()
    const user = useSelector( state => state.auth.user )
    const token = useSelector( state => state.auth.token )

    const {
        data,
        isLoading,
        isSuccess,
        isError
    } = useGetUserQuery( null, {
        skip: ! token
    } )

    const getUserData = () => {

        if( ! token ) return

        if( ! isLoading ) {

            if( isSuccess ) dispatch( setUser( data ) )

            if( isError ) dispatch( logOut() )

        }

    }

    useEffect( () => {

        getUserData()

    }, [isLoading] )
    
    return ( ! isLoading &&
        <>
            <Navigation />

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

                    <Outlet />

                </div>
            </main>

            <FlashMessages />

        </>        
    )
}

export default DefaultLayout