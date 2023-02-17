import { configureStore } from "@reduxjs/toolkit"
import API from "@/services/API"
import authReducer from "@/store/slices/auth/authSlice"
import notifySliceReducer from "@/store/slices/notify/notifySlice"
import verifySliceReducer from "@/store/slices/system/verifySlice"

const store = configureStore( {
    reducer: {
        [API.reducerPath]: API.reducer,
        auth: authReducer,
        notify: notifySliceReducer,
        "system/verify": verifySliceReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat( API.middleware ),
    devTools: true
} )

export default store