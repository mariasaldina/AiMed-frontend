import type { InvitationStatus } from "@/features/invitations/type/invitations";

export interface Notification {
    id: number
    status: InvitationStatus
    invitationId: number
    isRead: boolean
    createdAt: string
}

export interface NotificationListDto {
    read: Notification[]
    unread: Notification[]
}