import { useAppSelector } from "@/hooks/redux"
import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, isInitialized } = useAppSelector(state => state.userReducer)
    const location = useLocation()

    const publicPaths = ['/login', '/sign-up', '/home']
    const isPublicPath = publicPaths.includes(location.pathname)

    if (!isInitialized) {
        return null
    }

    if (!user && !isPublicPath) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

export default AuthWrapper