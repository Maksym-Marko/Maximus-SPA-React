import { useDispatch, useSelector } from "react-redux"
import { useEmailVerSendMutation } from "@/services/Auth"
import { setMessages, setErrors } from "@/store/slices/notify/notifySlice"
import { LockClosedIcon } from "@heroicons/react/20/solid"
import { setVerifTime } from "@/store/slices/system/verifySlice"

const VerificationEmailForm = () => {

    const dispatch = useDispatch()

    const [emailVerSend, { isLoading }] = useEmailVerSendMutation()

    const user = useSelector( state => state.auth.user )

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

    const resendVerificationEmail = async ( e ) => {

        e.preventDefault()

        if( isLoading ) return

        if( user?.emailVerifiedAt ) return

        if( ! checkVerifTime() ) {

            if( messages.length===0 ) {

                dispatch( setMessages( 'Wait ' + timeDifference() + ' seconds' ) )
                
            }

            return
        }

        dispatch( setVerifTime( Date.now() ) )

        try {

            const send = await emailVerSend().unwrap()

            if( send?.message === 'success' ) {

                dispatch( setMessages( 'Verification email sent successfully.' ) )

            }
            
        } catch ( error ) {            

            dispatch( setErrors( {
                'message': 'Something went wrong!'
            } ) )
            
        }

    }

    return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">

            <div>

                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Email verification</h2>
                <p className="mt-2 text-justify">
                    Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                </p>

            </div>
            
            <form 
                className="mt-8 space-y-6"
                onSubmit={resendVerificationEmail}
            >

                <div>

                    <button
                        type={!isLoading ? 'submit' : 'button'}
                        disabled={isLoading}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        { isLoading && <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span> }
                        Resend Verification Email
                    </button>                 

                </div>

            </form>

        </div>
    </div>
    )

}

export default VerificationEmailForm