import { configureStore } from "@reduxjs/toolkit"
import API from "@/services/API"
import authReducer from "@/features/auth/authSlice"

const store = configureStore( {
    reducer: {
        [API.reducerPath]: API.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(API.middleware),
    devTools: true
} )

export default store