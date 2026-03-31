import api from "@/lib/axios"
import type { LoginCredentialsDto, SignUpCredentialsDto } from "@/features/auth/types/auth"
import type { User } from "@/features/user/types/user"

export const login = async (credentials: LoginCredentialsDto) => {
    await api.post<User>('/auth/login', credentials)
}

export const logout = async () => {
    await api.post('auth/logout')
}

export const signUp = async (credentials: SignUpCredentialsDto): Promise<User> => {
    const { data } = await api.post<User>('/auth/sign-up', credentials)
    return data
}