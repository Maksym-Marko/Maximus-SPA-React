import API from "@/services/API"

const Auth = API.injectEndpoints( {

    endpoints: builder => ( {
        emailVerCheck: builder.mutation( {
            query: credentials => ( {
                url: '/send-email-verification-check',
                method: 'POST',
                body: { ...credentials }
            } )
        } ),
        emailVerSend: builder.mutation( {
            query: credentials => ( {
                url: '/send-email-verification-url',
                method: 'POST',
                body: { 
                    verificationUrl: import.meta.env.VITE_EMAIL_VERIFICATION_BASE_URL,
                }
            } )
        } ),
        register: builder.mutation( {
            query: credentials => ( {
                url: '/register',
                method: 'POST',
                body: { ...credentials }
            } )
        } ),
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
    useEmailVerCheckMutation,
    useEmailVerSendMutation,
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetUserQuery
 } = Auth