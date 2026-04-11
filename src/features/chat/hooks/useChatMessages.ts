import React, { useEffect, useLayoutEffect, useRef } from "react"
import axios from "axios"
import { loadMessagesThunk, resetMessages } from "../lib/chatMessagesSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useNavigate } from "react-router-dom"

export const useChatMessages = (
    chatId: number | null,
    scrollableRef: React.RefObject<HTMLDivElement | null>,
    sending: boolean
) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { messages } = useAppSelector(state => state.chatMessagesReducer)

    useEffect(() => {
        dispatch(resetMessages())

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
        }

        loadMessages()
    }, [chatId])

    const initRef = useRef(true)

    useEffect(() => {
        initRef.current = true
    }, [chatId])

    useLayoutEffect(() => {
        if (!messages.length) return
        if (!initRef.current) return
        const root = scrollableRef.current
        if (!root) return

        root.scrollTop = root.scrollHeight
        initRef.current = false
    }, [messages.length])

    useLayoutEffect(() => {
        if (initRef.current) return
        if (!sending) return
        const root = scrollableRef.current
        if (!root) return

        root.scrollTop = root.scrollHeight
        initRef.current = false
    }, [sending])
}