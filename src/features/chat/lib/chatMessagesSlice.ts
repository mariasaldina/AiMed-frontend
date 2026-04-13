import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "../types/chat";
import { findDoctorsApi, getMessages, inviteDoctor, sendMessage } from "../api/chatApi";
import axios from "axios";
import { moveToTop } from "./chatsSlice";
import type { RootState } from "@/lib/store";

interface ChatMessagesSliceType {
    messages: Message[],
    hasMore: boolean
}

const initialState: ChatMessagesSliceType = { messages: [], hasMore: true }

const chatMessagesSlice = createSlice({
    name: 'chatMessages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload)
        },
        resetMessages: (state) => {
            state.messages = []
            state.hasMore = true
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
                const existing = new Set(state.messages.map(m => m.id))

                const newMessages = action.payload.messages

                const filtered = newMessages.filter(m => !existing.has(m.id))
                state.messages.unshift(...filtered)

                state.hasMore = action.payload.hasMore
            })

            .addCase(findDoctorsThunk.fulfilled, (state, action) => {
                state.messages.push(action.payload)
            })

            .addCase(inviteDoctorThunk.fulfilled, (state, action) => {
                state.messages.push(action.payload)
            })

            .addCase(sendMessageNonOptimisticThunk.fulfilled, (state, action) => {
                state.messages.push(...action.payload)
            })
    }
})

export const loadMessagesThunk = createAsyncThunk<
    { messages: Message[], hasMore: boolean }, { chatId: number | null }, { state: RootState }
>(
    'chatMessages/loadMessages',
    async ({ chatId }: { chatId: number | null }, { rejectWithValue, getState }) => {
        try {
            const messages = getState().chatMessagesReducer.messages
            const before = messages.length !== 0 ? messages[0].createdAt : ''
            const res = await getMessages(chatId, before, 3)
            console.log(res)
            return res
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

export const sendMessageThunk = createAsyncThunk(
    'chatMessages/sendMessage',
    async (
        { content, chatId, tempId }: { content: string, chatId: number, tempId: string },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const { userMessage, assistantMessage } = await sendMessage(content, chatId)
            dispatch(moveToTop(chatId))
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

export const sendMessageNonOptimisticThunk = createAsyncThunk(
    'chatMessages/sendMessageNonOptimistic',
    async (
        { content, chatId }: { content: string, chatId: number },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const { userMessage, assistantMessage } = await sendMessage(content, chatId)
            dispatch(moveToTop(chatId))
            return [userMessage, assistantMessage]
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


export const findDoctorsThunk = createAsyncThunk(
    'chatMessages/findDoctors',
    async ({ chatId }: { chatId: number }, { rejectWithValue, dispatch }) => {
        try {
            const res = await findDoctorsApi(chatId)
            dispatch(moveToTop(chatId))
            return res
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
    async (
        { chatId, doctorId, content }: { chatId: number, doctorId: number, content: string },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const res = await inviteDoctor(chatId, doctorId, content)
            dispatch(moveToTop(chatId))
            return res
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

export const { setMessages, addMessage, resetMessages } = chatMessagesSlice.actions

export default chatMessagesSlice.reducer