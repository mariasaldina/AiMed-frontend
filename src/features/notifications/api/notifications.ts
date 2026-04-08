import api from "@/lib/axios"
import type { InvitationStatus, Notification } from "../types/notifications"

export const getNotifications = async () => {
    const { data } = await api.get<Notification[]>('/notifications')
    return data
}

export const notifyPatient = async (status: InvitationStatus, notificationId: number) => {
    await api.post(`/notifications/${notificationId}/answer`, { status })
}