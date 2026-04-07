import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "../types/chat";
import { findDoctorsApi, getMessages, sendMessage } from "../api/chatApi";

interface ChatMessagesSliceType {
    messages: Message[]
}

const initialState: ChatMessagesSliceType = { messages: [] }

const chatMessagesSlice = createSlice({
    name: 'chatMessages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.messages = state.messages.flatMap(m =>
                    m.id === action.payload.tempId
                        ? action.payload.messages
                        : [m]
                )
            })

            .addCase(loadMessagesThunk.fulfilled, (state, action) => {
                state.messages = action.payload
            })

            .addCase(findDoctorsThunk.fulfilled, (state, action) => {
                state.messages.push(action.payload)
            })
    }
})

export const sendMessageThunk = createAsyncThunk(
    'chatMessages/sendMessage',
    async ({ content, chatId, tempId } : { content: string, chatId: number, tempId: string }) => {
        const { userMessage, assistantMessage } = await sendMessage(content, chatId)
        return { tempId, messages: [userMessage, assistantMessage] }
    }
)

export const loadMessagesThunk = createAsyncThunk(
    'chatMessages/loadMessages',
    async ({ chatId, signal } : { chatId: number, signal: AbortSignal }) => {
        const messages = await getMessages(signal, chatId)
        return messages
    }
)

export const findDoctorsThunk = createAsyncThunk(
    'chatMessages/findDoctors',
    async ({ chatId } : { chatId: number }) => {
        return await findDoctorsApi(chatId)
    }
)

export const { setMessages, addMessage } = chatMessagesSlice.actions

export default chatMessagesSlice.reducer