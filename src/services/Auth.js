import API from "@/services/API"

const Auth = API.injectEndpoints( {

    endpoints: builder => ( {
        login: builder.mutation( {
            query: credentials => ( {
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            } )
        } ),
        logout: builder.mutation( {
            query: () => ( {
                url: '/logout',
                method: 'POST',
                body: {}
            } )
        } ),
        getUser: builder.query( {
            query: () => '/user',
        } ),
    } )

} )

export default Auth

export const { 
    useLoginMutation,
    useLogoutMutation,
    useGetUserQuery
 } = Auth