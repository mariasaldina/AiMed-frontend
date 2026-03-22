import { getChats } from "@/features/chat/api/chatApi"
import Chat from "@/features/chat/components/chat/Chat"
import ChatList from "@/features/chat/components/chatList/ChatList"
import type { Chat as ChatType } from "@/features/chat/types/chat"
import { useEffect, useState } from "react"
import styles from './HomePage.module.scss'
import MaximizeIcon from "@/ui/icons/maximizeIcon/MaximizeIcon"
import { useIsDesktop } from "@/hooks/useIsDesktop"
import { useParams } from "react-router-dom"
import MinimizeIcon from "@/ui/icons/minimizeIcon/MinimizeIcon"
import Header from "@/features/header/Header"
import Sidebar from "@/features/sidebar/Sidebar"
import { useDispatch } from "react-redux"
import { logout as logoutApi } from "@/features/auth/api/auth"
import { setUser } from "@/features/user/userSlice"

const HomePage = () => {
    const isDesktop = useIsDesktop()

    const { chatId } = useParams()
    const parsedChatId = chatId ? Number(chatId) : null
    const hasChat = Boolean(parsedChatId)

    const [chats, setChats] = useState<ChatType[]>([])
    const [folded, setFolded] = useState(!isDesktop)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        getChats()
            .then(setChats)
            .catch(err => {
                console.log(err)
                setChats([])
            })
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        setFolded(!isDesktop)
    }, [isDesktop])

    const logout = async () => {
        await logoutApi()
        dispatch(setUser(null))
    }

    return (
        <div className={styles.layout}>
            <Header onLogout={logout} />

            <div className={styles.content}>
                {(isDesktop || hasChat)
                    &&
                    <>
                        <Sidebar
                            folded={folded}
                            isLoading={isLoading}
                        >
                            <ChatList
                                chats={chats}
                                setChats={setChats}
                                displayedChat={parsedChatId}
                                setIsFolded={setFolded}
                                className={styles.chatList}
                            />
                        </Sidebar>
                        <button
                            type="button"
                            onClick={e => { e.stopPropagation(); setFolded(!folded) }}
                            className={styles.foldBtn}
                        >
                            {folded ? <MaximizeIcon /> : <MinimizeIcon />}
                        </button>
                    </>
                }

                <main className={styles.chatArea}>
                    {parsedChatId
                        ?
                        <Chat chatId={parsedChatId} />
                        :
                        (!isDesktop
                            &&
                            <ChatList
                                chats={chats}
                                setChats={setChats}
                                displayedChat={parsedChatId}
                                setIsFolded={setFolded}
                                className={styles.mobileChatList}
                            />
                        )
                    }

                    {!folded && !isDesktop
                        &&
                        <div
                            className={styles.overlay}
                            onClick={() => setFolded(true)}
                        />
                    }
                </main>
            </div>
        </div>
    )
}

export default HomePage