import { getChats } from "@/features/chat/api/chatApi"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { setUser } from "@/features/userSlice/userSlice"
import ChatLayout from "@/layouts/ChatLayout"
import { setChats } from "@/features/chatSlice/chatSlice"
import { useAppDispatch } from "@/hooks/redux"

const ChatPage = () => {
    const { chatId } = useParams()
    const parsedChatId = chatId ? Number(chatId) : null
    const hasChat = Boolean(parsedChatId)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchChats = async () => {
            try {
                //start loading
                const chats = await getChats()
                dispatch(setChats(chats))
            } catch (err) {
                console.log(err)
                dispatch(setChats([]))
            } finally {
                //stop loading
            }
        }

        fetchChats()
    }, [])

    return (
        <ChatLayout chatId={parsedChatId} />
    )
}

export default ChatPage