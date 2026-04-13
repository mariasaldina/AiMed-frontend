import { useAppDispatch } from "@/hooks/redux"
import { useNavigate } from "react-router-dom"
import { addChatThunk, deleteChatThunk, renameChatThunk } from "../lib/chatsSlice"
import { useState } from "react"

const useChatList = (displayedChat: number | null, onChatSelect: () => void) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [deleted, setDeleted] = useState<number | null>(null)
    const [renamed, setRenamed] = useState<number | null>(null)

    const handleAdd = async (title: string) => {
        const chat = await dispatch(addChatThunk({ title })).unwrap()
        navigate(`/chats/${chat.id}`)
    }

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

    const handleRename = async (title: string, chatId: number) => {
        setRenamed(chatId)
        try {
            await dispatch(renameChatThunk({ chatId, title }))
        } catch (e) {
        } finally {
            setRenamed(null)
        }
    }

    const handleSelect = (chatId: number) => {
        onChatSelect()
        navigate(`/chats/${chatId}`)
    }

    return {
        deleted,
        renamed,
        handleAdd,
        handleDelete,
        handleRename,
        handleSelect
    }
}

export default useChatList