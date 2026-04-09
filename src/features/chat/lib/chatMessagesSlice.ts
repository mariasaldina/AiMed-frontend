import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "../types/chat";
import { findDoctorsApi, getMessages, inviteDoctor, sendMessage } from "../api/chatApi";
import axios from "axios";

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

            .addCase(inviteDoctorThunk.fulfilled, (state, action) => {
                state.messages.push(action.payload)
            })
    }
})

export const sendMessageThunk = createAsyncThunk(
    'chatMessages/sendMessage',
    async ({ content, chatId, tempId } : { content: string, chatId: number, tempId: string }, { rejectWithValue }) => {
        try {
            const { userMessage, assistantMessage } = await sendMessage(content, chatId)
            return { tempId, messages: [userMessage, assistantMessage] }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 404) {
                    return rejectWithValue("Такого чата не существует")
                }
                if (e.response?.status === 503) {
                    return rejectWithValue("AI-сервис недоступен, попробуйте позже")
                }
            }
            return rejectWithValue("Ошибка отправки сообщения")
        }
    }
)

export const loadMessagesThunk = createAsyncThunk(
    'chatMessages/loadMessages',
    async ({ chatId, signal } : { chatId: number, signal: AbortSignal }, { rejectWithValue }) => {
        try {
            const messages = await getMessages(signal, chatId)
            return messages
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 404) {
                    return rejectWithValue("Такого чата не существует")
                }
            }
            return rejectWithValue("Ошибка загрузки сообщений")
        }
    }
)

export const findDoctorsThunk = createAsyncThunk(
    'chatMessages/findDoctors',
    async ({ chatId } : { chatId: number }, { rejectWithValue }) => {
        try {
            return await findDoctorsApi(chatId)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 404) {
                    return rejectWithValue("Такого чата не существует")
                }
                if (e.response?.status === 503) {
                    return rejectWithValue("AI-сервис недоступен, попробуйте позже")
                }
            }
            return rejectWithValue("Ошибка поиска специалистов")
        }
    }
)

export const inviteDoctorThunk = createAsyncThunk(
    'chatMessages/inviteDoctor',
    async ({ chatId, doctorId, content }: { chatId: number, doctorId: number, content: string }, { rejectWithValue }) => {
        try {
            return await inviteDoctor(chatId, doctorId, content)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 404) {
                    return rejectWithValue("Такого специалиста не существует")
                }
            }
            return rejectWithValue("Ошибка отправки приглашения")
        }
    }
)

export const { setMessages, addMessage } = chatMessagesSlice.actions

export default chatMessagesSlice.reducer