import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User, PatientProfile, DoctorProfile, Contacts } from "../types/user";
import { editDoctorProfile, editPatientProfile, getUser, updateContacts } from '@/features/user/api/user'
import { login, logout, signUp } from "@/features/auth/api/auth";
import type { LoginCredentialsDto, SignUpCredentialsDto } from "@/features/auth/types/auth";
import { loadNotificationsThunk } from "@/features/notifications/lib/notificationSlice";
import axios from "axios";

interface UserSliceType {
    user: User | null,
    isInitialized: boolean
}

const initialState: UserSliceType = { user: null, isInitialized: false }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.user = action.payload
                state.isInitialized = true
            })
            .addCase(getUserThunk.rejected, state => {
                state.isInitialized = true
            })

            .addCase(logoutThunk.fulfilled, state => {
                state.user = null
            })
            .addCase(editDoctorProfileThunk.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(editPatientProfileThunk.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(updateContactsThunk.fulfilled, (state, action) => {
                if (state.user) {
                    state.user = { ...state.user, contacts: action.payload }
                }
            })
    }
})

export const loginThunk = createAsyncThunk('user/login',
    async ({ credentials }: { credentials: LoginCredentialsDto }, { dispatch, rejectWithValue }) => {
        try {
            await login(credentials)
            dispatch(getUserThunk())
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 401) {
                    return rejectWithValue("Неверный username или пароль")
                }
            }
            return rejectWithValue("Неизвестная ошибка входа")
        }
    }
)

export const signUpThunk = createAsyncThunk('user/signUp',
    async ({ credentials }: { credentials: SignUpCredentialsDto }, { dispatch, rejectWithValue }) => {
        try {
            await signUp(credentials)
            dispatch(getUserThunk())
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 409) {
                    return rejectWithValue("Пользователь с таким username уже существует")
                }
            }
            return rejectWithValue("Неизвестная ошибка регистрации")
        }
    }
)

export const getUserThunk = createAsyncThunk('user/getUser',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const user = await getUser()
            if (user) {
                dispatch(loadNotificationsThunk())
            }
            return user
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 401) {
                    return rejectWithValue("Пользователь не авторизован")
                }
            }
            return rejectWithValue("Неизвестная ошибка авторизации")
        }
    }
)

export const logoutThunk = createAsyncThunk('user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logout()
        } catch (e) {
            return rejectWithValue("Ошибка при выходе")
        }
    }
)

export const editDoctorProfileThunk = createAsyncThunk('user/editDoctorProfile',
    async ({ fullName, profile }: { fullName: string, profile: DoctorProfile }, { rejectWithValue }) => {
        try {
            return await editDoctorProfile(fullName, profile)
        } catch (e) {
            return rejectWithValue("Ошибка при редактировании профиля")
        }
    }
)

export const editPatientProfileThunk = createAsyncThunk('user/editPatientProfile',
    async ({ fullName, profile }: { fullName: string, profile: PatientProfile }, { rejectWithValue }) => {
        try {
            return await editPatientProfile(fullName, profile)
        } catch (e) {
            return rejectWithValue("Ошибка при редактировании профиля")
        }
    }
)

export const updateContactsThunk = createAsyncThunk('user/updateContacts',
    async ({ contacts }: { contacts: Contacts }, { rejectWithValue }) => {
        try {
            await updateContacts(contacts)
            return contacts
        } catch (e) {
            return rejectWithValue("Ошибка при редактировании контактов")
        }
    }
)

export default userSlice.reducer