import type { Contacts, Gender } from "@/features/user/types/user";

export type NotificationType = 'PATIENT' | 'DOCTOR'

export type InvitationStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface PatientCardType {
    fullName: string;
    address: string,
    birthdate: Date,
    gender: Gender,
    medicalHistory: string
}

export interface DoctorNotificationType {
    id: number;
    type: 'DOCTOR';
    createdAt: string;
    content: string;
    invitationStatus: InvitationStatus;
    patient: PatientCardType
}

export interface DoctorCardType {
    fullName: string;
    address: string,
    education: string,
    description: string,
    practiceStartDate: Date,
    specializations: string[],
    contacts?: Contacts
}

export interface PatientNotificationType {
    id: number;
    type: 'PATIENT';
    createdAt: string;
    content: string;
    invitationStatus: InvitationStatus;
    doctor: DoctorCardType
}

export type Notification = DoctorNotificationType | PatientNotificationType