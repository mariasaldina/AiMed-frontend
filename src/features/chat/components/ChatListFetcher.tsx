import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { loadChatsThunk } from "@/features/chat/lib/chatsSlice"
import { useAppDispatch } from "@/hooks/redux"

const ChatListFetcher = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadChatsThunk())
    }, [])

    return <Outlet />
}

export default ChatListFetcher