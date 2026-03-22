import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import settingsReducer from "@/features/settings/settingsSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingsReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>