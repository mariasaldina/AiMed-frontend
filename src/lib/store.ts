import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice/userSlice";
import settingsReducer from "@/features/settingsSlice/settingsSlice"
import chatsReducer from "@/features/chatSlice/chatSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingsReducer,
        chats: chatsReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>