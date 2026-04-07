import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { InvitationStatus, Notification } from "../types/notifications"
import { getNotifications, notifyPatient } from "../api/notifications"

interface NotificationsSliceType {
    notifications: Notification[]
}

const initialState: NotificationsSliceType = { notifications: [] }

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(loadNotificationsThunk.fulfilled, (state, action) => {
                state.notifications = action.payload
            })
            .addCase(notifyPatientThunk.fulfilled, (state, action) => {
                state.notifications = state.notifications.map(n => (
                    n.id === action.payload.notificationId
                    ? { ...n, invitationStatus: action.payload.status }
                    : n
                ))
            })
    }
})

export const loadNotificationsThunk = createAsyncThunk('notification/loadNotifications',
    async () => {
        return await getNotifications()
    }
)

export const notifyPatientThunk = createAsyncThunk('notifications/notifyPatient',
    async ({ status, notificationId }: { status: InvitationStatus, notificationId: number }) => {
        await notifyPatient(status, notificationId)
        return { status, notificationId }
    }
)

export default notificationSlice.reducer