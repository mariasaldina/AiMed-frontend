import { useState } from "react"
import type { Message } from "../types/chat"
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from "@/hooks/redux"
import { addMessage, findDoctorsThunk, sendMessageThunk } from "../lib/chatMessagesSlice"

const useMessageInput = (chatId: number | null) => {
    const dispatch = useAppDispatch()
    const [content, setContent] = useState('')

    const handleSend = async () => {
        if (!chatId) return
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