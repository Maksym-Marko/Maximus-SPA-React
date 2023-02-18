import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { useEmailVerCheckMutation } from "@/services/Auth";
import { useDispatch } from "react-redux";
import { setMessages, setErrors } from "@/store/slices/notify/notifySlice";
import { setEmaiVerifiedDate } from "@/store/slices/auth/authSlice";

let checkKey = true

const VerifyEmailCheck = () => {

    const [emailVerCheck] = useEmailVerCheckMutation()

    const dispatch = useDispatch()

    const redirect = useNavigate()

    const [searchParams] = useSearchParams()

    const verData = {
        id: searchParams.get( 'id' ),
        hash: searchParams.get( 'hash' ),
    }

    const verification = async () => {

        if( ( searchParams.get( 'id' ) && searchParams.get( 'hash' ) ) ) {

            try {

                const res = await emailVerCheck( verData ).unwrap()

                if( res?.message === 'success' ) {

                    dispatch( setEmaiVerifiedDate( res.verified_at ) )
                    dispatch( setMessages( 'Email verified!' ) )                

                } else {
                    dispatch( setErrors( {
                        'message': 'Something went wrong!'
                    } ) )
                }

                redirect( '/dashboard' )
                
                
            } catch ( error ) {

                dispatch( setErrors( {
                    'message': 'Something went wrong!'
                } ) )

                redirect( '/' )
                
            }

        }

    }

    useEffect( () => {    
        
        if( checkKey ) {

            verification()

            checkKey = false

        }

    }, [] )

    return ( ( ! searchParams.get( 'id' ) || ! searchParams.get( 'hash' ) ) ?
        <Navigate to="/" replace="true" /> :
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>

                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Email verification</h2>
                    
                    <p className="mt-2 text-center">
                        Verification ...
                    </p>

                </div>
            </div>
        </div>          
    )
}

export default VerifyEmailCheck