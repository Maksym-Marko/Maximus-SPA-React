import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice( {
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem( 'TOKEN' ),
    },
    reducers: {
        logIn: ( state, action ) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
            localStorage.setItem( 'TOKEN', token )
        },
        logOut: ( state, action ) => {
            state.user = null
            state.token = null
            localStorage.removeItem( 'TOKEN' )
        },
    },
} )

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer