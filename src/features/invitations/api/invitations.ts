import api from "@/lib/axios"
import type { Invitation } from "../type/invitations"

export const sendDoctorsResponse = async (status: 'APPROVED' | 'REJECTED', invitationId: number) => {
    await api.post(`/invitations/${invitationId}/answer`, { status })
}

export const getInvitations = async () => {
    const { data } = await api.get<Invitation[]>('/invitations')
    return data
}

export const cancelInvitation = async (invitationId: number) => {
    await api.post(`/invitations/${invitationId}/cancel`)
}