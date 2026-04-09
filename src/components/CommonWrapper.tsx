import { clearError } from "@/features/settings/settingsSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import ErrorAlert from "@/ui/ErrorAlert"
import { Center, Loader } from "@mantine/core"
import { type ReactNode } from "react"

const CommonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { loading } = useAppSelector(state => state.settingsReducer)
    const { errors } = useAppSelector(state => state.settingsReducer)
    const dispatch = useAppDispatch()

    const isUserLoading = loading['user/getUser']
    const isUserInitialized = 'user/getUser' in loading

    const errorKeys = Object.keys(errors).filter(k => errors[k] && k !== 'user/getUser')

    const currentError = errors[errorKeys[0]]

    return (
        <>
            {(isUserLoading || !isUserInitialized) && <Center h={'100dvh'}><Loader /></Center>}
            <ErrorAlert errorMessage={currentError} onClose={() => dispatch(clearError(errorKeys[0]))} />
            {children}
        </>
    )
}

export default CommonWrapper