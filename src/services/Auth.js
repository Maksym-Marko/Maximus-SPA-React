import API from "@/services/API"

const Auth = API.injectEndpoints( {

    endpoints: builder => ( {
        login: builder.mutation( {
            query: credentials => ( {
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            } )
        } )
    } )

} )

export const { useLoginMutation } = Auth