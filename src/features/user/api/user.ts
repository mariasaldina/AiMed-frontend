import api from "@/lib/axios"
import type { User } from "../types/user"

export const getUser = async () => {
    const { data } = await api.get<User>('/user/me')
    return data
}