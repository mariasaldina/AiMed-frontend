import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User, PatientProfile, DoctorProfile, Contacts } from "../types/user";
import { editDoctorProfile, editPatientProfile, getUser as getUserApi, updateContacts } from '@/features/user/api/user'
import { logout } from "@/features/auth/api/auth";

interface UserSliceType {
    user: User | null
}

const initialState: UserSliceType = { user: null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.user = action.payload
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
                    state.user.contacts = action.payload
                }
            })
    }
})

export const getUserThunk = createAsyncThunk('user/getUser',
    async () => {
        return await getUserApi()
    }
)

export const logoutThunk = createAsyncThunk('user/logout',
    async () => {
        await logout()
    }
)

export const editDoctorProfileThunk = createAsyncThunk('user/editDoctorProfile',
    async ({ fullName, profile }: { fullName: string, profile: DoctorProfile }) => {
        return await editDoctorProfile(fullName, profile)
    }
)

export const editPatientProfileThunk = createAsyncThunk('user/editPatientProfile',
    async ({ fullName, profile }: { fullName: string, profile: PatientProfile }) => {
        return await editPatientProfile(fullName, profile)
    }
)

export const updateContactsThunk = createAsyncThunk('user/updateContacts',
    async ({ contacts }: { contacts: Contacts }) => {
        await updateContacts(contacts)
        return contacts
    }
)

export const { setUser } = userSlice.actions

export default userSlice.reducer