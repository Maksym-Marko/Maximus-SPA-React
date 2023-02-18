import { LockClosedIcon } from "@heroicons/react/20/solid"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { useResetPasswordMutation } from "@/services/Auth"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { setMessages, setErrors } from "@/store/slices/notify/notifySlice"

const ResetPasswordForm = () => {

    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const redirect = useNavigate()
    
    const [userData, setUserData] = useState( {
        email: null,
        password: null,
        password_confirmation: null,
        token: searchParams.get( 'token' )
    } )

    const handleInput = ( e ) => {
        setUserData( prevData => { 
            return {
                ...prevData,
                [e.target.name]: e.target.value
            } 
        } )
    }

    const attemptResetPassword = async ( e ) => {

        e.preventDefault()

        if( ! searchParams.get( 'token' ) ) return

        if( ! userData.email || ! userData.password || ! userData.password_confirmation ) {
            console.log( 'Please, fill in data' )
            return
        }

        try {

            const res = await resetPassword( userData ).unwrap()

            if( res?.message === 'success' ) {

                dispatch( setMessages( 'Password reset successfully. Please login!' ) )

                redirect( '/login' )

            }
            
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

    return ( ( ! searchParams.get( 'token' ) ) ?
        <Navigate to="/" replace={true} /> :
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Reset Password</h2>
                    
                </div>

                <form
                    className="mt-8 space-y-6"
                    onSubmit={attemptResetPassword}
                >

                    <input type="hidden" name="remember" defaultValue="true" />

                    <div className="-space-y-px rounded-md shadow-sm">
                                            
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

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={handleInput}
                                required
                                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="sr-only">
                                Password Confirmation
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                onChange={handleInput}
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password Confirmation"
                            />
                        </div>

                    </div>

                    <div>
                        <button
                            type={!isLoading ? 'submit' : 'button'}
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            { isLoading && <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span> }
                            
                            {isLoading ? 'Reset ...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            
            </div>
        </div>
    )
}

export default ResetPasswordForm