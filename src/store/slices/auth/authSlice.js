import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: localStorage.getItem( 'TOKEN' ),
}

const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        setEmaiVerifiedDate: ( state, action ) => {

            if( ! action.payload ) return

            state.user.emailVerifiedAt = action.payload

        },
        setUser: ( state, action ) => {

            if( ! action.payload ) return
            
            const { data } = action.payload
            state.user = data
        },
        setCredentials: ( state, action ) => {
            
            if( ! action.payload ) return

            const { user, token } = action.payload
            state.user = user
            state.token = token
            localStorage.setItem( 'TOKEN', token )

        },
        destroyCredentials: ( state, action ) => {
            state.user = null
            state.token = null
            localStorage.removeItem( 'TOKEN' )
        },
    },

} )

export const {
    setEmaiVerifiedDate,
    setUser,
    setCredentials,
    destroyCredentials
} = authSlice.actions

export default authSlice.reducer