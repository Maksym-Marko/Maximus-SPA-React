import { configureStore } from "@reduxjs/toolkit"
import API from "@/services/API"
import authReducer from "@/store/slices/auth/authSlice"
import notifySlice from "@/store/slices/notify/notifySlice"

const store = configureStore( {
    reducer: {
        [API.reducerPath]: API.reducer,
        auth: authReducer,
        notify: notifySlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat( API.middleware ),
    devTools: true
} )

export default store