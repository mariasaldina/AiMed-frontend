import { getChats } from "@/features/chat/api/chatApi"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { setChats } from "@/features/chatSlice/chatSlice"
import { useAppDispatch } from "@/hooks/redux"

const ChatFetcher = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchChats = async () => {
            try {
                //start loading
                const chats = await getChats()
                dispatch(setChats(chats))
            } catch (err) {
                console.log(err)
                dispatch(setChats([]))
            } finally {
                //stop loading
            }
        }

        fetchChats()
    }, [])

    return <Outlet />
}

export default ChatFetcher