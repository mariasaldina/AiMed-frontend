import { useAppSelector } from "@/hooks/redux"
import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAppSelector(state => state.userReducer)
    const location = useLocation()

    const publicPaths = ['/auth', '/home']
    const isPublicPath = publicPaths.includes(location.pathname)

    if (!user && !isPublicPath) {
        return <Navigate to="/auth" state={{ from: location }} replace />
    }

    return children
}

export default AuthWrapper