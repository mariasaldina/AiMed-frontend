import { getUserThunk } from "@/features/user/lib/userSlice"
import { useAppDispatch } from "@/hooks/redux"
import { useEffect, type ReactNode } from "react"

function UserInitializer({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserThunk())
    }, [])

    return children
}

export default UserInitializer