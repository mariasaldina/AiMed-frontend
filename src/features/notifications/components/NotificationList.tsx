import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Accordion, Stack } from "@mantine/core"
import { useEffect } from "react"
import { loadNotificationsThunk, readNotificationsThunk } from "../lib/notificationSlice"
import CardContainer from "@/ui/cards/CardContainer"
import type { Notification } from "../types/notifications"

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

    const elementHandler = (n: Notification) => {
        return (<></>)
    }

    return (
        <Stack
            py={{ base: 'md', sm: 'xl' }}
            px={{ base: 'md', sm: '20%' }}
        >
            <CardContainer
                data={unread}
                loading={loading['notifications/loadNotifications']}
                elementHandler={elementHandler}
            />

            <Accordion>
                <Accordion.Item value="read">
                    <Accordion.Control>
                        Прочитанные
                    </Accordion.Control>

                    <Accordion.Panel>
                        <CardContainer
                            data={read}
                            loading={loading['notifications/loadNotifications']}
                            elementHandler={elementHandler}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    )
}

export default NotificationList