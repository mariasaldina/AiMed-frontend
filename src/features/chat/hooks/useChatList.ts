import { useAppDispatch } from "@/hooks/redux"
import { useNavigate } from "react-router-dom"
import { deleteChat } from "../api/chatApi"
import { removeChat } from "@/features/chat/lib/chatSlice"

const useChatList = (displayedChat: number | null, onChatSelect: () => void) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleDelete = async (chatId: number) => {
        try {
            await deleteChat(chatId)
            if (chatId === displayedChat) {
                navigate('/chats')
            }
            dispatch(removeChat(chatId))
        } catch (e) {
            console.log(e)
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