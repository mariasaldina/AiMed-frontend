import api from "@/lib/axios"
import type { LoginCredentialsDto, SignUpCredentialsDto } from "@/features/auth/types/auth"

export const login = async (credentials: LoginCredentialsDto) => {
    await api.post('/auth/login', credentials)
}

export const logout = async () => {
    await api.post('auth/logout')
}

export const signUp = async (credentials: SignUpCredentialsDto) => {
    await api.post('/auth/sign-up', credentials)
}