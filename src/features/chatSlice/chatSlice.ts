import { createSlice, type PayloadAction  } from "@reduxjs/toolkit";
import type { Chat } from "../chat/types/chat";

type ChatsState = Chat[]

const initialState: ChatsState = []

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<ChatsState>) => {
            return action.payload
        },
        addChat: (state, action: PayloadAction<Chat>) => {
            state.unshift(action.payload)
        },
        removeChat: (state, action: PayloadAction<number>) => {
            return state.filter(c => c.id !== action.payload)
        }
    }
})

export const { setChats, addChat, removeChat } = chatsSlice.actions

export default chatsSlice.reducer