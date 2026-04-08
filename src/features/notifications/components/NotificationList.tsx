import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Center, Flex, Loader, ScrollArea } from "@mantine/core"
import { uuidv4 } from "zod"
import PatientNotification from "./PatientNotification"
import DoctorNotification from "./DoctorNotification"
import { useEffect } from "react"
import { loadNotificationsThunk } from "../lib/notificationSlice"

const NotificationList = () => {
    const { notifications } = useAppSelector(state => state.notificationReducer)
    const { user } = useAppSelector(state => state.userReducer)
    const { loading } = useAppSelector(state => state.settingsReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadNotificationsThunk())
    }, [])

    return (
        <ScrollArea
            h={"100%"}
            type="auto"
            offsetScrollbars
        >
            <Flex
                direction={'column'}
                style={{ listStyle: 'none' }}
                py={{ base: 'md', sm: 'xl' }}
                px={{ base: 'md', sm: '20%' }}
                gap={{ base: 'md', sm: 'xl' }}
                w='100%'
            >
                {loading['notification/loadNotifications'] ?
                    <Center h={'100dvh'}><Loader /></Center> :
                    notifications.map(n =>
                        n.type === 'PATIENT' && user?.role === 'PATIENT'
                            ? <PatientNotification key={n.id} notification={n} />
                            : n.type === 'DOCTOR' && user?.role === 'DOCTOR'
                                ? <DoctorNotification key={n.id} notification={n} />
                                : <div key={String(uuidv4())} />
                    )}

            </Flex>
        </ScrollArea>
    )
}

export default NotificationList