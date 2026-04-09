import type { Contacts, Gender } from "@/features/user/types/user";

export type NotificationType = 'PATIENT' | 'DOCTOR'

export type InvitationStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

interface BaseNotification {
    id: number
    type: NotificationType
    createdAt: string
    content: string
    invitationStatus: InvitationStatus
    isRead: boolean
}

export interface DoctorNotificationType extends BaseNotification {
    type: 'DOCTOR'
    patient: PatientCardType
}

export interface PatientNotificationType extends BaseNotification {
    type: 'PATIENT';
    doctor: DoctorCardType
}

export interface PatientCardType {
    fullName: string
    address: string
    birthdate: Date
    gender: Gender
    medicalHistory: string
}

export interface DoctorCardType {
    fullName: string
    address: string
    education: string
    description: string
    practiceStartDate: Date
    specializations: string[]
    contacts?: Contacts
}

export type Notification = DoctorNotificationType | PatientNotificationType

export interface NotificationListDto {
    read: Notification[]
    unread: Notification[]
}