import api from '@/lib/axios'
import type { Message, MessageDto } from '../types/chat'
import { mapMessage } from '../utils/messageMapper'
import type { Chat } from '../types/chat'

export const getMessages = async (chatId: number | null, before: string, limit: number) => {
    const { data } = await api.get<{ messages: MessageDto[], hasMore: boolean }>(
        `/chat/${chatId}`,
        { params: { before, limit } }
    )
    console.log(data)
    return { messages: data.messages.map(m => mapMessage(m)), hasMore: data.hasMore }
}

interface SendMessageResponseDto {
    userMessage: MessageDto,
    assistantMessage: MessageDto
}

export const sendMessage = async (content: string, chatId: number):
    Promise<
        {
            userMessage: Message,
            assistantMessage: Message
        }
    > => {
    const { data } = await api.post<SendMessageResponseDto>(`/chat/${chatId}`, { content })
    return {
        userMessage: mapMessage(data.userMessage),
        assistantMessage: mapMessage(data.assistantMessage)
    }
}

export const getChats = async (): Promise<Chat[]> => {
    const { data } = await api.get<Chat[]>('/chat')
    return data
}

export const createChat = async (title: string): Promise<Chat> => {
    const { data } = await api.post<Chat>('/chat', { title })
    return data
}

export const deleteChat = async (chatId: number): Promise<void> => {
    await api.delete(`/chat/${chatId}`)
}

export const findDoctorsApi = async (chatId: number): Promise<Message> => {
    const { data } = await api.post<MessageDto>(`/chat/${chatId}/doctors`)
    return mapMessage(data)
}

export const inviteDoctor = async (chatId: number, doctorId: number, content: string) => {
    const { data } = await api.post<MessageDto>('/invitations/invite', { chatId, doctorId, content })
    return mapMessage(data)
}