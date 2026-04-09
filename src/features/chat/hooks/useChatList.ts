import { useAppDispatch } from "@/hooks/redux"
import { useNavigate } from "react-router-dom"
import { deleteChatThunk } from "../lib/chatSlice"

const useChatList = (displayedChat: number | null, onChatSelect: () => void) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleDelete = async (chatId: number) => {
        dispatch(deleteChatThunk({ chatId }))
        if (chatId === displayedChat) {
            navigate('/chats')
        }
    }

    const handleSelect = (chatId: number) => {
        onChatSelect()
        navigate(`/chats/${chatId}`)
    }

    return {
        handleDelete,
        handleSelect
    }
}

export default useChatList