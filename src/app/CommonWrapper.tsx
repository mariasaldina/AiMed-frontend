import { useAppSelector } from "@/hooks/redux"
import { Center, Loader } from "@mantine/core"
import type { ReactNode } from "react"

const CommonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { loading } = useAppSelector(state => state.settingsReducer)
    
    const isUserLoading = loading['user/getUser']
    const isUserInitialized = 'user/getUser' in loading

    if (isUserLoading || !isUserInitialized) {
        return <Center h={'100dvh'}><Loader /></Center>
    }

    return children
}

export default CommonWrapper