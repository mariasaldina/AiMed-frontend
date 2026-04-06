import { useEffect } from "react"
import axios from "axios"
import { loadMessagesThunk, setMessages } from "../lib/chatMessagesSlice"
import { useAppDispatch } from "@/hooks/redux"
import { useNavigate } from "react-router-dom"

export const useChatMessages = (chatId: number | null) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!chatId) {
            dispatch(setMessages([]))
            return
        }

        const controller = new AbortController()
        const loadMessages = async () => {
            dispatch(loadMessagesThunk({ chatId, signal: controller.signal }))
                .unwrap()
                .catch(err => {
                    if (axios.isAxiosError(err) && err.response?.status === 404) {
                        navigate('/chats')
                    }
                })
        }

        loadMessages()

        return () => {
            controller.abort()
        }
    }, [chatId])
}