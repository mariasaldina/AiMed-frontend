import { createSlice } from "@reduxjs/toolkit";
import type { Settings } from "./types";
import { getUser } from "../user/lib/userSlice";

const initialState: Settings = { loading: true, errors: [] }

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUser.pending, state => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, state => {
                state.loading = false;
            })
            .addCase(getUser.rejected, state => {
                state.loading = false;
            })
    }
})

export const { startLoading, stopLoading } = settingsSlice.actions

export default settingsSlice.reducer