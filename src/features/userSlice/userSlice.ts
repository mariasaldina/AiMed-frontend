import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";
import api from "@/lib/axios";

type UserState = User | null

const initialState: UserState = null as UserState

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            return action.payload
        },
        resetUser: (state) => {
            return null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
                return action.payload
            })
    }
})

export const getUser = createAsyncThunk('user/getUser',
    async () => {
        const { data } = await api.get<User>('/user/me')
        return data
    }
)

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer