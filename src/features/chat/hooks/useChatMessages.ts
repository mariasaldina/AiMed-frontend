import { useEffect } from "react"
import axios from "axios"
import { loadMessagesThunk, setMessages } from "../lib/chatMessagesSlice"
import { useAppDispatch } from "@/hooks/redux"
import { useNavigate } from "react-router-dom"

export const useChatMessages = (chatId: number | null, initDoneRef: React.RefObject<boolean>) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('init')
        dispatch(setMessages([]))

        if (!chatId) {
            return
        }

        const loadMessages = async () => {
            dispatch(loadMessagesThunk({ chatId }))
                .unwrap()
                .catch(err => {
                    if (axios.isAxiosError(err) && err.response?.status === 404) {
                        navigate('/chats')
                    }
                })
                .finally(() => initDoneRef.current = true)
        }

        loadMessages()
    }, [chatId])
}