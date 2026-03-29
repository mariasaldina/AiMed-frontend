import { useAppSelector } from "@/hooks/redux"
import Loader from "@/ui/loader/Loader"
import type { ReactNode } from "react"

const CommonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const loading = useAppSelector(state => state.settings.loading)
    
    if (loading) return <Loader fullScreen={true} />

    return children
}

export default CommonWrapper