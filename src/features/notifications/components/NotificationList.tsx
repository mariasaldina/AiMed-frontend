import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Accordion, Center, Flex, Loader, ScrollArea } from "@mantine/core"
import PatientNotification from "./PatientNotification"
import DoctorNotification from "./DoctorNotification"
import { useEffect } from "react"
import { loadNotificationsThunk, readNotificationsThunk } from "../lib/notificationSlice"

const NotificationList = () => {
    const { read, unread } = useAppSelector(state => state.notificationReducer.notifications)
    const { user } = useAppSelector(state => state.userReducer)
    const { loading } = useAppSelector(state => state.settingsReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadNotificationsThunk())

        return () => {
            dispatch(readNotificationsThunk())
        }
    }, [])

    return (
        <ScrollArea
            h={"100%"}
            type="auto"
            offsetScrollbars
        >
            <Flex
                direction={'column'}
                py={{ base: 'md', sm: 'xl' }}
                px={{ base: 'md', sm: '20%' }}
                gap={{ base: 'md', sm: 'xl' }}
                w='100%'
            >
                {loading['notification/loadNotifications'] ?
                    <Center h={'100dvh'}><Loader /></Center> :

                    <>
                        {unread.map(n =>
                            n.type === 'PATIENT' && user?.role === 'PATIENT'
                                ? <PatientNotification key={n.id} notification={n} />
                                : n.type === 'DOCTOR' && user?.role === 'DOCTOR'
                                    ? <DoctorNotification key={n.id} notification={n} />
                                    : null
                        )}

                        <Accordion>
                            <Accordion.Item value="read">
                                <Accordion.Control>
                                    Прочитанные
                                </Accordion.Control>

                                <Accordion.Panel>
                                    <Flex direction={'column'} gap={{ base: 'md', sm: 'xl' }}>
                                        {read.map(n => (
                                            n.type === 'PATIENT' && user?.role === 'PATIENT'
                                                ? <PatientNotification key={n.id} notification={n} />
                                                : n.type === 'DOCTOR' && user?.role === 'DOCTOR'
                                                    ? <DoctorNotification key={n.id} notification={n} />
                                                    : null
                                        ))}
                                    </Flex>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </>
                }

            </Flex>
        </ScrollArea>
    )
}

export default NotificationList