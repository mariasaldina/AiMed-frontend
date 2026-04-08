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
    address: string,
    birthdate: Date,
    gender: Gender,
    medicalHistory: string
}

export interface DoctorProfile {
    address: string,
    education: string,
    description: string,
    practiceStartDate: Date,
    license: string,
    licenseIssueDate: Date,
    licenseExpiryDate: Date,
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