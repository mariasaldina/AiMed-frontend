export type UserRole = 'PATIENT' | 'DOCTOR'

export interface User {
    id: number,
    username: string,
    role: UserRole
}