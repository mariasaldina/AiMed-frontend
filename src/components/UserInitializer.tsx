import { getUserThunk } from "@/features/user/lib/userSlice"
import { useAppDispatch } from "@/hooks/redux"
import { useEffect, type ReactNode } from "react"

const UserInitializer: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserThunk())
    }, [])

    return children
}

export default UserInitializer