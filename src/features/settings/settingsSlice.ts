import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";

type LoadingState = Record<string, boolean>
type ErrorState = Record<string, string | null>

interface SettingsSliceType {
    loading: LoadingState;
    errors: ErrorState;
}

const initialState: SettingsSliceType = { loading: {}, errors: {} }

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        clearError: (state, action) => {
            state.errors[action.payload] = null
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                isPending,
                (state, action) => {
                    const key = action.type.replace('/pending', '')
                    state.loading[key] = true
                    state.errors[key] = null
                }
            )
            .addMatcher(
                isFulfilled,
                (state, action) => {
                    const key = action.type.replace('/fulfilled', '')
                    state.loading[key] = false
                }
            )
            .addMatcher(
                isRejected,
                (state, action) => {
                    const key = action.type.replace('/rejected', '')
                    state.loading[key] = false

                    if (action.payload && typeof action.payload === 'string') {
                        state.errors[key] = action.payload
                    } else {
                        state.errors[key] = action.error.message ?? 'Unknown error'
                    }
                }
            )
    }
})

export const { clearError } = settingsSlice.actions

export default settingsSlice.reducer