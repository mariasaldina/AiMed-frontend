import { useEffect, useState } from "react"
import type { Message } from "../../types/message"
import { findDoctorsApi, getContactsApi, getMessages, sendMessage } from "../../api/chatApi"
import MessageList from "../MessageList"
import MessageInput from "../messageInput/MessageInput"
import { v4 as uuidv4 } from 'uuid'
import styles from './Chat.module.scss'
import Loader from "@/ui/loader/Loader"
import TypingIndicator from "@/ui/typingIndicator/TypingIndicator"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface ChatProps {
    chatId: number
}

const Chat: React.FC<ChatProps> = ({ chatId }) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [messageListLoading, setMessageListLoading] = useState(false)
    const [messageSending, setMessageSending] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const tempId = uuidv4()
        const tempUserMessage: Message = {
            kind: "user",
            id: tempId,
            content: inputValue,
            createdAt: new Date()
        }
        setMessages(prevMessages => [...prevMessages, tempUserMessage])
        setInputValue('')

        try {
            setMessageSending(true)
            const { userMessage, assistantMessage } = await sendMessage(inputValue, chatId)
            setMessages(prev =>
                prev.flatMap(m =>
                    m.id === tempId
                        ? [userMessage, assistantMessage]
                        : [m]
                )
            )
        } catch (e) {
            console.log(e)
        } finally {
            setMessageSending(false)
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        const controller = new AbortController()
        const loadMessages = async () => {
            try {
                setMessageListLoading(true)
                console.log('messages loading')
                const messages = await getMessages(controller.signal, chatId)
                setMessages(messages)
                console.log(messages)
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        navigate('/chats')
                    }
                }
                console.log(err)
            }
            setMessageListLoading(false)
        }

        loadMessages()

        return () => {
            controller.abort()
        }
    }, [chatId])

    const findDoctors = async () =>{
        try {
            setMessageSending(true)
            const message = await findDoctorsApi(chatId)
            setMessages(prev => [...prev, message])
        } catch (e) {
            console.log(e)
        } finally {
            setMessageSending(false)
        }
    }

    const getContacts = async (doctorId: number) => {
        try {
            setMessageSending(true)
            const message = await getContactsApi(chatId, doctorId)
            setMessages(prev => [...prev, message])
        } catch (e) {
            console.log(e)
        } finally {
            setMessageSending(false)
        }
    }

    return (
        <div className={styles.chat}>
            {messageListLoading ?
                <div className={styles.loader}><Loader size={50} /></div> :
                <div className={styles.container}>
                    <MessageList
                        messages={messages}
                        className={styles.messageList}
                        getContacts={getContacts}
                    />
                    {messageSending ? <TypingIndicator /> : <></>}
                </div>
            }
            <MessageInput
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSend}
                findDoctors={findDoctors}
                disabled={messageSending}
            />
        </div>
    )
}

export default Chat