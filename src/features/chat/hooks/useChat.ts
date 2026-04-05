import { useEffect, useState } from "react"
import type { Message } from "../types/message"
import { findDoctorsApi, getContactsApi, getMessages, sendMessage } from "../api/chatApi"
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from "react-router-dom"
import axios from "axios"

const useChat = (chatId: number | null) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [messageListLoading, setMessageListLoading] = useState(false)
    const [messageSending, setMessageSending] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleSend = async () => {
        if (!chatId) return
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
        if (!chatId) return

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
        if (!chatId) return
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
        if (!chatId) return
        try {
            setMessageSending(true)
            await getContactsApi(chatId, doctorId)
        } catch (e) {
            console.log(e)
        } finally {
            setMessageSending(false)
        }
    }

    return {
        messages,
        messageListLoading,
        messageSending,
        inputValue,
        setInputValue,
        handleSend,
        findDoctors,
        getContacts
    }
}

export default useChat;