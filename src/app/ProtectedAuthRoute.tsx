import type { ReactNode } from "react"
import type React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/hooks/redux"
import Loader from "@/ui/loader/Loader"

const ProtectedAuthRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const user = useAppSelector(state => state.user)
    const loading = useAppSelector(state => state.settings.loading)
    
    if (loading) return <Loader />
    if (user) {
        return <Navigate to="/chats" replace />
    }

    return children;
}

export default ProtectedAuthRoute