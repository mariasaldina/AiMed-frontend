export type UserRole = 'PATIENT' | 'DOCTOR'

export interface User {
    id: number,
    username: string,
    role: UserRole,
    profile: PatientProfile | DoctorProfile
}

export interface PatientProfile {
    address: string,
    birthdate: string,
    gender: 'MALE' | 'FEMALE',
    medicalHistory: string
}

export interface DoctorProfile {
    address: string,
    education: string,
    description: string,
    practiceStartDate: string,
    lisence: string,
    lisenceIssueDate: string,
    licenseExpiryDate: string
}