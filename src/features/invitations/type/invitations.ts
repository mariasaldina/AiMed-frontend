import type { Contacts, Gender } from "@/features/user/types/user"

export type InvitationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'

export interface DoctorCardType {
    username: string
    fullName: string
    address: string
    education: string
    description: string
    practiceStartDate: Date
    specializations: string[]
    contacts?: Contacts
}

export interface PatientCardType {
    fullName: string
    address: string
    birthdate: Date
    gender: Gender
    medicalHistory: string
}

export interface Invitation {
    id: number
    content: string
    createdAt: string
    respondedAt: string
    status: InvitationStatus
    doctor: DoctorCardType
    patient: PatientCardType
}
