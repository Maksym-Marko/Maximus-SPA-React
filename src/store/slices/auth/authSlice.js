import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: localStorage.getItem( 'TOKEN' ),
}

const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        setUser: ( state, action ) => {

            if( ! action.payload ) return
            
            const { data } = action.payload
            state.user = data
        },
        logIn: ( state, action ) => {
            
            if( ! action.payload ) return

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

export const { setUser, logIn, logOut } = authSlice.actions

export default authSlice.reducer