import { useAppDispatch } from "@/hooks/redux"
import { useNavigate } from "react-router-dom"
import { deleteChatThunk } from "../lib/chatsSlice"
import { useState } from "react"

const useChatList = (displayedChat: number | null, onChatSelect: () => void) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [deleted, setDeleted] = useState<number | null>(null)

    const handleDelete = async (chatId: number) => {
        setDeleted(chatId)
        try {
            await dispatch(deleteChatThunk({ chatId })).unwrap()
            if (chatId === displayedChat) {
                navigate('/chats')
            }
        } catch (e) {
        } finally {
            setDeleted(null)
        }
    }

    const handleSelect = (chatId: number) => {
        onChatSelect()
        navigate(`/chats/${chatId}`)
    }

    return {
        deleted,
        handleDelete,
        handleSelect
    }
}

export default useChatList