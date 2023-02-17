import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"

// todo
import { setMessages, setErrors, clearErrors, clearMessages } from "@/store/slices/notify/notifySlice"

const expTime = {
    messageTime: null,
    errorTime: null,
}

const FlashMessages = () => {

    const dispatch = useDispatch()

    const messages = useSelector( state => state.notify.messages )
    const errors = useSelector( state => state.notify.errors )
    
    const emptyMessages = () => {

        if( messages.length===0 ) return

        clearTimeout( expTime.messageTime )

        expTime.messageTime = setTimeout( () => {

            dispatch( clearMessages() )

        }, 2000 )

    }

    const emptyErrors = () => {

        if( errors.length===0 ) return

        clearTimeout( expTime.errorTime )

        expTime.errorTime = setTimeout( () => {

            dispatch( clearErrors() )

        }, 2000 )

    }

    useEffect( () => {

        emptyMessages()
        emptyErrors()

    }, [messages, errors] )

    return (
        <>

            <button onClick={ () => dispatch( setMessages( 'message' ) ) }>Add message</button>
            <button onClick={ () => dispatch( setErrors( {'message': 'Credentials incorrect'} ) ) }>Add error</button>

            {
                messages.length>0 || ( errors.length>0 ) ?
                <div
                    style={ {
                        position: 'fixed',
                        right: '20px',
                        bottom: '20px'    
                    } }   
                >

                    <div                                
                        className="fixed bottom-2 right-2"
                    >

                        {
                            messages.length>0 &&                        
                            messages.map( ( message, index ) => (                            
                                <p
                                    key={index}
                                    className="p-5 mb-2 bg-green-200 rounded max-w-xs text-green-900"
                                >{ message }</p>
                            ) )                 
                        }

                        {
                            errors.length>0 &&
                            errors.map( ( error, index ) => (
                                <p
                                    key={index}
                                    className="p-5 mb-2 bg-red-200 rounded max-w-xs text-red-900"
                                >{ error.message }</p>
                            ) )

                        }

                    </div>

                </div> :
                ''
            }
        </>
    )
}

export default FlashMessages