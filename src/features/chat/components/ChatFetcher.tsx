import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { loadChatsThunk } from "@/features/chat/lib/chatSlice"
import { useAppDispatch } from "@/hooks/redux"

const ChatFetcher = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadChatsThunk())
    }, [])

    return <Outlet />
}

export default ChatFetcher