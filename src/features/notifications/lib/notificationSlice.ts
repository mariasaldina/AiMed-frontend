import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getNotifications, readNotifications } from "../api/notifications"
import type { RootState } from "@/lib/store"
import type { Notification } from "@/features/notifications/types/notifications"

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