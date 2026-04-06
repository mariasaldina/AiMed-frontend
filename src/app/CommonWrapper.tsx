import { useAppSelector } from "@/hooks/redux"
import { Center, Loader } from "@mantine/core"
import type { ReactNode } from "react"

const CommonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { loading } = useAppSelector(state => state.settingsReducer)
    
    if (loading['user/getUser']) return <Center h={'100dvh'}><Loader /></Center>

    return children
}

export default CommonWrapper