import { LockClosedIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForgotPasswordSendMutation } from "@/services/Auth"
import { setErrors, setMessages } from "@/store/slices/notify/notifySlice"
import { useSelector } from "react-redux"
import { setVerifTime } from "@/store/slices/system/verifySlice"

const ForgotPasswordForm = () => {

    const [forgotPasswordSend, { isLoading }] = useForgotPasswordSendMutation()
    const dispatch = useDispatch()

    const verifTime = useSelector( state => state['system/verify'].verifTime )
    const verifPerion = useSelector( state => state['system/verify'].verifPerion )
    const messages = useSelector( state => state.notify.messages )

    const checkVerifTime = () => {

        if( ! verifTime ) return true

        if( ( Date.now() - parseInt( verifTime ) ) / 1000 > verifPerion ) return true        

        return false

    }

    const timeDifference = () => {

        return verifPerion - parseInt( ( Date.now() - parseInt( verifTime ) ) / 1000 )

    }

    const [userData, setUserData] = useState( {
        email: null,
    } )

    const handleInput = ( e ) => {
        setUserData( prevData => { 
            return {
                ...prevData,
                [e.target.name]: e.target.value
            } 
        } )
    }

    const forgotPassword = async ( e ) => {

        e.preventDefault()

        if( ! checkVerifTime() ) {

            if( messages.length===0 ) {

                dispatch( setMessages( 'Wait ' + timeDifference() + ' seconds' ) )
                
            }

            return
        }        

        try {

            const user = await forgotPasswordSend( userData ).unwrap()
            dispatch( setMessages( 'Sent successfully. Check your email.' ) )

            dispatch( setVerifTime( Date.now() ) )
            
        } catch ( error ) {

            if( error?.data?.message ) {

                dispatch( setErrors( {
                    'message': error.data.message
                } ) )

            } else {

                dispatch( setErrors( {
                    'message': 'Something went wrong!'
                } ) )

            }
            
        }

    }

    return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <div>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Forgot Password</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                </p>
            </div>
            <form 
                onSubmit={forgotPassword}
                className="mt-8 space-y-6"
            >

                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={handleInput}
                        required
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>

                {
                    ! checkVerifTime() &&
                    <div className="p-5 text-center mb-2 bg-green-200 rounded text-green-900">
                        Please, check your email
                    </div>
                }

                <div>
                    <button
                        type={!isLoading ? 'submit' : 'button'}
                        disabled={isLoading}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        { isLoading && <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span> }
                        
                        {isLoading ? 'SENDING ...' : 'SEND PASSWORD RESET LINK'}
                    </button>
                </div>
                
            </form>
        </div>
    </div>
    )

}

export default ForgotPasswordForm