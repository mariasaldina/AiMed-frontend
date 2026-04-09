import api from "@/lib/axios"
import type { InvitationStatus, NotificationListDto } from "../types/notifications"

export const getNotifications = async () => {
    const { data } = await api.get<NotificationListDto>('/notifications')
    return data
}

export const notifyPatient = async (status: InvitationStatus, notificationId: number) => {
    await api.post(`/notifications/${notificationId}/answer`, { status })
}

export const readNotifications = async (notificationIds: number[]) => {
    await api.patch('/notifications/read', { notificationIds })
}