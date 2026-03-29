import { getUser } from "@/features/userSlice/userSlice"
import { useAppDispatch } from "@/hooks/redux"
import { useEffect, type ReactNode } from "react"

const UserInitializer: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return children
}

export default UserInitializer