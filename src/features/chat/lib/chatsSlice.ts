import { createAsyncThunk, createSlice, type PayloadAction  } from "@reduxjs/toolkit";
import type { Chat } from "../types/chat";
import { createChat, deleteChat, getChats } from "../api/chatApi";
import axios from "axios";

interface ChatsSliceType {
    chats: Chat[]
}

const initialState: ChatsSliceType = { chats: [] }

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        moveToTop: (state, action: PayloadAction<number>) => {
            const index = state.chats.findIndex(c => c.id === action.payload)
            if (index !== -1) {
                const [chat] = state.chats.splice(index, 1)
                state.chats.unshift(chat)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadChatsThunk.fulfilled, (state, action) => {
                state.chats = action.payload
            })
            .addCase(addChatThunk.fulfilled, (state, action) => {
                state.chats.unshift(action.payload)
            })
            .addCase(deleteChatThunk.fulfilled, (state, action) => {
                state.chats = state.chats.filter(c => c.id !== action.payload)
            })
    }
})

export const loadChatsThunk = createAsyncThunk('chats/loadChats',
    async (_, { rejectWithValue }) => {
        try {
            return await getChats()
        } catch (e) {
            return rejectWithValue("Ошибка загрузки чатов")
        }
    }
)

export const addChatThunk = createAsyncThunk('chats/addChat',
    async ({ title }: { title: string }, { rejectWithValue }) => {
        try {
            return await createChat(title)
        } catch (e) {
            return rejectWithValue("Ошибка создания чата")
        }
    }
)

export const deleteChatThunk = createAsyncThunk('chats/deleteChat',
    async ({ chatId }: { chatId: number }, { rejectWithValue }) => {
        try {
            await deleteChat(chatId)
            return chatId
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 404) {
                    return rejectWithValue("Такого чата не существует")
                }
            }
            return rejectWithValue("Ошибка удаления чата")
        }
    }
)

export const { moveToTop } = chatsSlice.actions

export default chatsSlice.reducer