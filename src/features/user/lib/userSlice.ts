import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";
import { getUser as getUserApi } from '@/features/user/api/user'

interface UserSliceType {
    user: User | null
}

const initialState: UserSliceType = { user: null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        resetUser: (state) => {
            state.user = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
            })
    }
})

export const getUser = createAsyncThunk('user/getUser',
    async () => {
        const user = await getUserApi()
        return user
    }
)

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer