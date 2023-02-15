import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery( { 
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
    credentials: 'include',
    prepareHeaders: ( headers, { getState } ) => {

        headers.set( "Accept", "application/json" )

        const token = getState().auth.token

        if ( token ) {
            headers.set( 'authorization', `Bearer ${token}` )
        }

        return headers

    }
} )

const handleResponse = async ( args, api, extraOptions ) => {
    let result = await baseQuery( args, api, extraOptions )

    console.log( result )

    return result
}

const API = createApi( {
    baseQuery: handleResponse,    
    endpoints: builder => ({}),
} )

export default API