import TrashIcon from "@/ui/icons/trashIcon/TrashIcon"
import type { Chat } from "../../types/chat"
import styles from "./ChatList.module.scss"
import { deleteChat } from "../../api/chatApi"
import type { SetStateAction } from "react"
import CreateChatForm from "../CreateChatForm"
import { useNavigate } from "react-router-dom"
import { useIsDesktop } from "@/hooks/useIsDesktop"

interface ChatListProps {
    chats: Chat[],
    setChats: React.Dispatch<SetStateAction<Chat[]>>,
    displayedChat: number | null,
    setIsFolded: React.Dispatch<SetStateAction<boolean>>,
    className?: string
}

const ChatList: React.FC<ChatListProps> = ({
    chats,
    setChats,
    displayedChat,
    setIsFolded,
    className
}) => {
    const navigate = useNavigate()
    const isDesktop = useIsDesktop()

    const handleDelete = async (chatId: number) => {
        await deleteChat(chatId)
        if (chatId === displayedChat) {
            navigate('/chats')
        }
        setChats(prev => prev.filter(c => c.id !== chatId))
    }

    const handleSelect = (chatId: number) => {
        if (!isDesktop) {
            setIsFolded(true)
        }
        navigate(`/chats/${chatId}`)
    }

    return (
        <aside className={`${styles.wrapper} ${className}`}>
            <div className={styles.header}>
                <CreateChatForm setChats={setChats}/>   
            </div>

            <ul className={styles.list}>
                {chats.map(chat => (
                    <li
                        key={chat.id}
                        className={`${styles.item} ${chat.id === displayedChat && styles.opened}`}
                        onClick={e => { e.stopPropagation(); handleSelect(chat.id) }}
                    >
                        <span className={styles.title}>
                            {chat.title}
                        </span>

                        <button
                            type="button"
                            className={styles.delete}
                            onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(chat.id)
                            }}
                        >
                            <TrashIcon />
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default ChatList