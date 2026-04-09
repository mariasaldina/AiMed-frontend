import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { InvitationStatus, Notification } from "../types/notifications"
import { getNotifications, notifyPatient, readNotifications } from "../api/notifications"
import type { RootState } from "@/lib/store"
import axios from "axios"

interface NotificationsSliceType {
    notifications: {
        read: Notification[],
        unread: Notification[]
    }
}

const initialState: NotificationsSliceType = { notifications: { read: [], unread: [] } }

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadNotificationsThunk.fulfilled, (state, action) => {
                state.notifications = action.payload
            })
            .addCase(notifyPatientThunk.fulfilled, (state, action) => {
                state.notifications = {
                    read: state.notifications.read.map(n => (
                        n.id === action.payload.notificationId
                            ? { ...n, invitationStatus: action.payload.status }
                            : n
                    )),
                    unread: state.notifications.unread.map(n => (
                        n.id === action.payload.notificationId
                            ? { ...n, invitationStatus: action.payload.status }
                            : n
                    ))
                }
            })
            .addCase(readNotificationsThunk.fulfilled, state => {
                state.notifications.read = [...state.notifications.unread, ...state.notifications.read]
                state.notifications.unread = []
            })
    }
})

export const loadNotificationsThunk = createAsyncThunk('notification/loadNotifications',
    async (_, { rejectWithValue }) => {
        try {
            return await getNotifications()
        } catch (e) {
            return rejectWithValue("Ошибка загрузки уведомлений")
        }
    }
)

export const notifyPatientThunk = createAsyncThunk('notifications/notifyPatient',
    async ({ status, notificationId }: { status: InvitationStatus, notificationId: number }, { rejectWithValue }) => {
        try {
            await notifyPatient(status, notificationId)
            return { status, notificationId }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 404) {
                    return rejectWithValue("Такого уведомления не существует")
                }
            }
            return rejectWithValue("Ошибка отправки ответа")
        }
    }
)

export const readNotificationsThunk = createAsyncThunk<
    void, void, { state: RootState }
>(
    'notification/readNotifications',
    async (_, { getState, rejectWithValue }) => {
        try {
            const unread = getState().notificationReducer.notifications.unread
            if (unread.length === 0) return
            await readNotifications(unread.map(n => n.id))
        } catch (e) {
            return rejectWithValue("Ошибка обновления уведомлений")
        }
    }
)

export default notificationSlice.reducer