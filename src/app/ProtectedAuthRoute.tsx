import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@/hooks/redux"

const ReverseAuthGuard = () => {
    const { user } = useAppSelector(state => state.userReducer)

    if (user) {
        return <Navigate to="/chats" replace />
    }

    return <Outlet />;
}

export default ReverseAuthGuard