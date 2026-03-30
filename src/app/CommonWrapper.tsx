import { useAppSelector } from "@/hooks/redux"
import { Loader } from "@mantine/core"
import type { ReactNode } from "react"

const CommonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const loading = useAppSelector(state => state.settings.loading)
    
    if (loading) return <Loader />

    return children
}

export default CommonWrapper