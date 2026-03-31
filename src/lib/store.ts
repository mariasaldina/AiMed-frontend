import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/lib/userSlice";
import settingsReducer from "@/features/settingsSlice/settingsSlice"
import chatsReducer from "@/features/chat/lib/chatSlice"

export const store = configureStore({
    reducer: {
        userReducer,
        settingsReducer,
        chatsReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>