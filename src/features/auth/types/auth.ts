import type { UserRole } from "@/features/user/types/user";

export interface LoginCredentialsDto {
    username: string,
    password: string
}

export interface SignUpCredentialsDto {
    username: string,
    password: string,
    fullName: string,
    role: UserRole
}