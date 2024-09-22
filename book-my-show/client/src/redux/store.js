import { configureStore } from "@reduxjs/toolkit"
import loaderReducer from "./loaderSlice"
import userReducer from "./userSlice"

const store = configureStore({
    reducer: {
        users: userReducer,
        loaders: loaderReducer
    }
})

export default store;