import { useAppSelector } from "@/hooks/redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const AuthWrapper = () => {
    const user = useAppSelector(state => state.user)
    const location = useLocation()

    if (!user) return <Navigate to="/auth" state={{ from: location }} replace />

    return <Outlet />
}

export default AuthWrapper