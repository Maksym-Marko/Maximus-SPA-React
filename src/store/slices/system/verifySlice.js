import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    attempt: false,
    verifTime: localStorage.getItem( 'VERIF_TIME' ),
    verifPerion: 60 // seconds
}

const verifySlice = createSlice( {
    name: 'system/verify',
    initialState,
    reducers: {
        setVerifTime: ( state, action ) => {
            localStorage.setItem( 'VERIF_TIME', action.payload )
            state.verifTime = action.payload
        },
        setAttempt: ( state, action ) => {
            state.attempt = action.payload
        },
    }
} )

export const {
    setVerifTime,
    setAttempt
} = verifySlice.actions

export default verifySlice.reducer