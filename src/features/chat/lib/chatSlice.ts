import { createSlice, type PayloadAction  } from "@reduxjs/toolkit";
import type { Chat } from "../types/chat";

interface ChatsSliceType {
    chats: Chat[]
}

const initialState: ChatsSliceType = { chats: [] }

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<Chat[]>) => {
            state.chats = action.payload
        },
        addChat: (state, action: PayloadAction<Chat>) => {
            state.chats.unshift(action.payload)
        },
        removeChat: (state, action: PayloadAction<number>) => {
            state.chats.filter(c => c.id !== action.payload)
        }
    }
})

export const { setChats, addChat, removeChat } = chatsSlice.actions

export default chatsSlice.reducer