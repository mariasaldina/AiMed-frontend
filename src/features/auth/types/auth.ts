import type { UserRole } from "@/features/userSlice/types";

export interface LoginCredentialsDto {
    username: string,
    password: string
}

export interface SignUpCredentialsDto {
    username: string,
    password: string,
    role: UserRole
}