import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Invitation } from "../type/invitations";
import { cancelInvitation, getInvitations, sendDoctorsResponse } from "../api/invitations";
import axios from "axios";

interface InvitationSliceType {
    invitations: Invitation[]
}

const initialState: InvitationSliceType = { invitations: [] }

const invitationSlice = createSlice({
    name: 'invitations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadInvitationsThunk.fulfilled, (state, action) => {
                state.invitations = action.payload
            })

            .addCase(sendDoctorsResponseThunk.fulfilled, (state, action) => {
                state.invitations =
                    state.invitations.map(n => (
                        n.id === action.payload.invitationId
                            ? { ...n, status: action.payload.status }
                            : n
                    ))
            })

            .addCase(cancelInvitationThunk.fulfilled, (state, action) => {
                state.invitations =
                    state.invitations.map(n => (
                        n.id === action.payload.invitationId
                            ? { ...n, status: 'CANCELLED' }
                            : n
                    ))
            })
    }
})

export const loadInvitationsThunk = createAsyncThunk(
    'invitations/loadInvitations',
    async () => {
        return await getInvitations()
    }
)

export const sendDoctorsResponseThunk = createAsyncThunk(
    'invitations/sendDoctorsResponse',
    async ({ status, invitationId }: { status: 'APPROVED' | 'REJECTED', invitationId: number }, { rejectWithValue }) => {
        try {
            await sendDoctorsResponse(status, invitationId)
            return { status, invitationId }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 404) {
                    return rejectWithValue("Такого приглашения не существует")
                }
                if (e.response?.status === 409) {
                    return rejectWithValue("Невалидный статус приглашения")
                }
            }
            return rejectWithValue("Ошибка отправки ответа")
        }
    }
)

export const cancelInvitationThunk = createAsyncThunk(
    'invitations/cancelInvitation',
    async ({ invitationId }: { invitationId: number }, { rejectWithValue }) => {
        try {
            await cancelInvitation(invitationId)
            return { invitationId }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 403) {
                    return rejectWithValue("Недостаточно прав")
                }
                if (e.response?.status === 404) {
                    return rejectWithValue("Такого приглашения не существует")
                }
                if (e.response?.status === 409) {
                    return rejectWithValue("Невалидный статус приглашения")
                }
            }
            return rejectWithValue("Ошибка отмены приглашения")
        }
    }
)

export default invitationSlice.reducer