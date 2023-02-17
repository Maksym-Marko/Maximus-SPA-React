import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messages: [],
    errors: [],
}

const notifySlice = createSlice( {
    name: 'notify',
    initialState,
    reducers: {
        setMessages: ( state, action ) => {

            state.messages.push( action.payload )

        },
        clearMessages: ( state, action ) => {

            state.messages = []

        },
        setErrors: ( state, action ) => {
            
            state.errors.push( action.payload )

        },
        clearErrors: ( state, action ) => {

            state.errors = []

        },
        
    }

} )

export const { setMessages, clearMessages, setErrors, clearErrors } = notifySlice.actions

export default notifySlice.reducer