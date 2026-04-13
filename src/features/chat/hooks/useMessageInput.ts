import { useState } from "react"
import type { Message } from "../types/chat"
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from "@/hooks/redux"
import { addMessage, findDoctorsThunk, sendMessageNonOptimisticThunk, sendMessageThunk } from "../lib/chatMessagesSlice"
import { addChatThunk } from "../lib/chatsSlice"
import { useNavigate } from "react-router-dom"

const useMessageInput = (chatId: number | null | undefined) => {
    const dispatch = useAppDispatch()
    const [content, setContent] = useState('')

    const navigate = useNavigate()

    const sendMessage = (chatId: number) => {
        if (!content.trim()) return

        const tempId = uuidv4()
        const tempUserMessage: Message = {
            kind: "user",
            id: tempId,
            content: content,
            createdAt: String(new Date())
        }
        dispatch(addMessage(tempUserMessage))
        setContent('')

        dispatch(sendMessageThunk({ content, chatId, tempId }))
    }

    const handleSend = async () => {
        if (!chatId) {
            await dispatch(addChatThunk({ title: 'Новый чат' })).unwrap()
                .then(async chat => {
                    await dispatch(sendMessageNonOptimisticThunk({ content, chatId: chat.id }))
                    navigate(`/chats/${chat.id}`)
                })
            return
        }

        sendMessage(chatId)
    }

    const findDoctors = async () => {
        if (!chatId) return
        dispatch(findDoctorsThunk({ chatId }))
    }

    return {
        content,
        setContent,
        handleSend,
        findDoctors
    }
}

export default useMessageInput