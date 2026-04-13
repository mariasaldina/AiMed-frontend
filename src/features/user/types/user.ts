export type UserRole = 'PATIENT' | 'DOCTOR'

export type Gender = 'MALE' | 'FEMALE'

export interface User {
    id: number,
    username: string,
    fullName: string,
    role: UserRole,
    profile: PatientProfile | DoctorProfile,
    contacts: Contacts
}

export interface PatientProfile {
    address: string | null,
    birthdate: Date | null,
    gender: Gender | null,
    medicalHistory: string | null
}

export interface DoctorProfile {
    address: string | null,
    education: string | null,
    description: string | null,
    practiceStartDate: Date | null,
    license: string | null,
    licenseIssueDate: Date | null,
    licenseExpiryDate: Date | null,
    specializationIds: number[]
}

export interface Specialization {
    id: number,
    name: string,
}

export interface Contacts {
    email: string | null,
    phone: string | null,
    messenger: string | null,
}