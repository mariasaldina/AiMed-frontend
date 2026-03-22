import { getUser } from "@/features/user/userSlice"
import { useAppDispatch } from "@/hooks/redux"
import { useEffect, type ReactNode } from "react"

const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return children
}

export default AuthWrapper