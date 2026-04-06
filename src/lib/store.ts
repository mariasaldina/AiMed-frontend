import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/lib/userSlice";
import settingsReducer from "@/features/settings/settingsSlice"
import chatsReducer from "@/features/chat/lib/chatSlice"
import chatMessagesReducer from "@/features/chat/lib/chatMessagesSlice"

export const store = configureStore({
    reducer: {
        userReducer,
        settingsReducer,
        chatsReducer,
        chatMessagesReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>