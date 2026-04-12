import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Accordion, Stack } from "@mantine/core"
import { useEffect } from "react"
import { loadNotificationsThunk, readNotificationsThunk } from "../lib/notificationSlice"
import CardContainer from "@/ui/cards/CardContainer"
import type { Notification } from "../types/notifications"
import ApprovedMessage from "@/ui/indicatorMessages/ApprovedMessage"
import RejectedMessage from "@/ui/indicatorMessages/RejectedMessage"
import PendingMessage from "@/ui/indicatorMessages/PendingMessage"
import CancelMessage from "@/ui/indicatorMessages/CancelMessage"

const NotificationList = () => {
    const { read, unread } = useAppSelector(state => state.notificationReducer.notifications)
    const { loading } = useAppSelector(state => state.settingsReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadNotificationsThunk())

        return () => {
            dispatch(readNotificationsThunk())
        }
    }, [])

    const elementHandler = (n: Notification) => {
        switch (n.status) {
            case 'APPROVED': {
                return <ApprovedMessage text="Специалист принял ваше приглашение" />
            }
            case 'REJECTED': {
                return <RejectedMessage text="Специалист отклонил ваше приглашение" />
            }
            case 'PENDING': {
                return <PendingMessage text="Вы получили приглашение от пациента" />
            }
            case 'CANCELLED': {
                return <CancelMessage text="Пациент отменил своё приглашение" />
            }
        }
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