import { useAppSelector } from "@/hooks/redux"
import Loader from "@/ui/loader/Loader"
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const user = useAppSelector(state => state.user)
    const loading = useAppSelector(state => state.settings.loading)

    if (loading) return <Loader />
    if (!user) return <Navigate to="/auth" replace />

    return children
}

export default PrivateRoute