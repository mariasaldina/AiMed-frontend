import api from "@/lib/axios"
import type { NotificationListDto } from "../types/notifications"

export const getNotifications = async () => {
    const { data } = await api.get<NotificationListDto>('/notifications')
    return data
}

export const readNotifications = async (notificationIds: number[]) => {
    await api.patch('/notifications/read', { notificationIds })
}