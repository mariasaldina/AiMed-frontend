import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/lib/userSlice";
import settingsReducer from "@/features/settings/settingsSlice"
import chatsReducer from "@/features/chat/lib/chatsSlice"
import chatMessagesReducer from "@/features/chat/lib/chatMessagesSlice"
import notificationReducer from "@/features/notifications/lib/notificationSlice"
import invitationReducer from "@/features/invitations/lib/invitationSlice"

export const store = configureStore({
    reducer: {
        userReducer,
        settingsReducer,
        chatsReducer,
        chatMessagesReducer,
        notificationReducer,
        invitationReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>