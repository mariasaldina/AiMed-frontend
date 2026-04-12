import { clearError } from "@/features/settings/settingsSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import ErrorAlert from "@/ui/ErrorAlert"
import { Center, Loader } from "@mantine/core"
import { type ReactNode } from "react"

function CommonWrapper({ children }: { children: ReactNode }) {
    const { loading } = useAppSelector(state => state.settingsReducer)
    const { errors } = useAppSelector(state => state.settingsReducer)
    const dispatch = useAppDispatch()

    const errorKeys = Object.keys(errors).filter(k => errors[k] && k !== 'user/getUser')
    const currentError = errors[errorKeys[0]]

    return (
        <>
            {loading['user/getUser'] && <Center h={'100dvh'}><Loader /></Center>}
            <ErrorAlert errorMessage={currentError} onClose={() => dispatch(clearError(errorKeys[0]))} />
            {children}
        </>
    )
}

export default CommonWrapper