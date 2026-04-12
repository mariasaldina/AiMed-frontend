import type { UserRole } from "@/features/user/types/user";
import { useAppSelector } from "@/hooks/redux";
import { Navigate, Outlet } from "react-router-dom";

function RoleGuard({ role }: { role: UserRole }) {
    const { user } = useAppSelector(state => state.userReducer)
    
    if (user?.role !== role) {
        return <Navigate to="/home" replace />
    }

    return <Outlet />
}

export default RoleGuard